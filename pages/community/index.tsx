import {useEffect, useRef, useState} from 'react';
import {NextPage} from 'next';
import {Post, User} from '@prisma/client';
import useCoords from '@libs/client/useCoords';
import Layout from '@components/layout';
import Link from 'next/link';
import {SWRConfig} from 'swr';
import useSWRInfinite from 'swr/infinite';
import Content from '@components/skeleton/Content';

interface PostWithUser extends Post {
 user: User;
 _count: {
  wondering: number;
  answers: number;
 };
}

// interface PostsResponse {
//  posts: PostWithUser[];
// }

const getKey = (pageIndex: number, previousPageData: string | any[]) => {
 if (previousPageData && !previousPageData.length) {
  return null;
 }
 return `/api/posts?page=${pageIndex}&limit=5`; // SWR 키
};

const Community: NextPage = () => {
 const {latitude, longitude} = useCoords();
 const naverMapsRef = useRef<naver.maps.Map>();
 const ref = useRef<HTMLDivElement | null>(null);
 const [target, setTarget] = useState<HTMLDivElement | null>(null);
 const {data, size, setSize, error, isValidating} = useSWRInfinite(
  getKey,
  (url: string) =>
   fetch(url)
    .then((response) => response.json())
    .then((response) => response.posts),
  {
   revalidateAll: true,
  },
 );

 const isLoadingInitialData = !data && !error;
 const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
 const isEmpty = data?.[0]?.length === 0;
 const isRefreshing = isValidating && data && data.length === size;
 const isEnd = !isLoadingMore && data?.[size - 1].length < 5;

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

 useEffect(() => {
  if (ref.current === null) return;
  if (latitude === null || longitude === null) return;

  const initMaps = () => {
   setTimeout(() => {});
   naverMapsRef.current = new naver.maps.Map(ref.current!, {
    center: new naver.maps.LatLng(latitude, longitude),
    zoom: 15,
    draggable: false,
   });

   new naver.maps.Marker({
    position: new naver.maps.LatLng(latitude, longitude),
    map: naverMapsRef.current,
   });
  };

  setTimeout(() => {
   initMaps();
  }, 150);
 }, [latitude, longitude]);

 return (
  <SWRConfig>
   <Layout hasTabBar title="나의 동네">
    <div className="px-4 pt-4">
     <div ref={ref} style={{width: '100%', height: '12vh'}}>
      <div className="animate-pulse flex space-x-4 w-full h-full">
       <div className="bg-slate-700 w-full h-full"></div>
      </div>
     </div>

     <div className="space-y-4 divide-y-[2px]">
      {data?.flat().map((post: PostWithUser) => (
       <Link key={post.id} href={`/community/${post.id}`}>
        <a className="flex cursor-pointer flex-col pt-4 items-start">
         <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-full">
          동네질문
         </span>
         <div className="mt-2 px-4 text-gray-700">
          <span className="text-orange-500 font-medium"></span> {post.question}
         </div>
         <div className="mt-5 px-4 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
          <span>{post.user.name}</span>
          <span>{post.createdAt}</span>
         </div>
         <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t   w-full">
          <span className="flex space-x-2 items-center text-sm">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
           </svg>
           <span>궁금해요 {post._count?.wondering}</span>
          </span>
          <span className="flex space-x-2 items-center text-sm">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="2"
             d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
           </svg>
           <span>답변 {post._count?.answers}</span>
          </span>
         </div>
        </a>
       </Link>
      ))}
      {isLoadingMore && <Content />}
     </div>

     <div className="w-full bg-red-300" ref={setTarget}>
      {isLoadingMore ? 'loading...' : isEnd ? 'no more issues' : 'load more'}
     </div>
    </div>
   </Layout>
  </SWRConfig>
 );
};

export default Community;
