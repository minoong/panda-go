import Layout from '@components/layout';
import type {NextPage} from 'next';
import Head from 'next/head';
import client from '@libs/server/client';
import {Product} from '@prisma/client';
import useSWR, {SWRConfig} from 'swr';
import useSWRInfinite from 'swr/infinite';
import useUser from '@libs/client/useUser';
import Item from '@components/item';
import FloatingButton from '@components/floating-button';
import {useEffect, useState} from 'react';

export interface ProductWithCount extends Product {
 _count: {
  favs: number;
 };
}

interface ProductsResponse {
 ok: boolean;
 products: ProductWithCount[];
 nextCursor: number;
}

const getKey = (pageIndex: number, previousPageData: ProductsResponse) => {
 if (previousPageData?.products && !previousPageData?.products?.length) {
  return null;
 }
 return `/api/products?page=${previousPageData?.nextCursor || 0}&limit=2`; // SWR 키
};

const Home: NextPage = () => {
 const {user, isLoading} = useUser();
 const [target, setTarget] = useState<HTMLDivElement | null>(null);
 const {data, size, setSize, error, isValidating} = useSWRInfinite<ProductsResponse>(getKey, (url: string) => fetch(url).then((response) => response.json()), {
  revalidateAll: true,
 });

 const isLoadingInitialData = !data && !error;
 const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
 const isEmpty = data?.[0]?.products.length === 0;
 const isRefreshing = isValidating && data && data.length === size;
 //  const isEnd = !isLoadingMore && data?.[size - 1]?.products?.length < 5;
 const isEnd = !isLoadingMore && (data![size - 1]?.products?.length || 0) < 2;

 // eslint-disable-next-line react-hooks/exhaustive-deps
 const onIntersect: IntersectionObserverCallback = (entries, observer) => {
  entries.forEach((entry) => {
   if (isEnd) return;
   if (entry.isIntersecting && !isLoadingMore) {
    observer.unobserve(entry.target);
    setSize(size + 1);
   }
  });
 };

 useEffect(() => {
  let observer: IntersectionObserver;
  if (target) {
   observer = new IntersectionObserver(onIntersect, {threshold: 0.5});
   observer.observe(target);
  }
  return () => {
   return observer && observer.disconnect();
  };
 }, [onIntersect, target]);

 return (
  <Layout title="홈" hasTabBar>
   <Head>
    <title>Home</title>
   </Head>
   <div className="flex flex-col space-y-5 divide-y">
    {data
     ? data?.map((products) =>
        products.products.map((product) => (
         <Item id={product.id} key={product.id} title={product.name} price={product.price} hearts={product._count?.favs || 0} image={product.image} />
        )),
       )
     : 'Loading...'}
    <FloatingButton href="/products/upload">
     <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
     </svg>
    </FloatingButton>
    <div className="w-full bg-red-300" ref={setTarget}>
     {isLoadingMore ? 'loading...' : isEnd ? 'no more issues' : 'load more'}
    </div>
   </div>
  </Layout>
 );
};

const Page: NextPage<{products: ProductsResponse[]}> = ({products}) => (
 <SWRConfig
  value={{
   fallback: {
    '/api/products?page=0&limit=2': {
     ok: true,
     products,
     nextCursor: 2,
    },
   },
  }}
 >
  <Home />
 </SWRConfig>
);

export async function getServerSideProps() {
 console.log('SSR');
 const products = await client.product.findMany({
  skip: 0,
  take: 2,
  orderBy: {
   createdAt: 'desc',
  },
 });

 console.log('products', products);

 return {
  props: {
   products: JSON.parse(JSON.stringify(products)),
  },
 };
}

export default Page;
