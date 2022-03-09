import Layout from '@components/layout';
import type {NextPage} from 'next';
import Head from 'next/head';
import client from '@libs/server/client';
import {Product} from '@prisma/client';
import {SWRConfig} from 'swr';

export interface ProductWithCount extends Product {
 _count: {
  favs: number;
 };
}

interface ProductsResponse {
 ok: boolean;
 products: ProductWithCount[];
}

const Home: NextPage = () => {
 return (
  <Layout title="Home" hasTabBar canGoBack>
   <Head>
    <title>Home</title>
   </Head>
   <div className="flex flex-col space-y-5 divide-y">
    <div>test!</div>
   </div>
  </Layout>
 );
};

const Page: NextPage<{products: ProductsResponse[]}> = ({products}) => (
 <SWRConfig
  value={{
   fallback: {
    '/api/products': {
     ok: true,
     products,
    },
   },
  }}
 >
  <Home />
 </SWRConfig>
);

export async function getServerSideProps() {
 console.log('SSR');
 const products = await client.product.findMany({});

 return {
  props: {
   products: JSON.parse(JSON.stringify(products)),
  },
 };
}

export default Page;
