import {useEffect, useRef, useState} from 'react';
import {NextPage} from 'next';
import {Post, User} from '@prisma/client';
import client from '@libs/server/client';
import useCoords from '@libs/client/useCoords';
import Layout from '@components/layout';

interface PostWithUser extends Post {
 user: User;
 _count: {
  wondering: number;
  answers: number;
 };
}

interface PostsResponse {
 posts: PostWithUser;
}

const Community: NextPage<PostsResponse> = ({posts}) => {
 const {latitude, longitude} = useCoords();
 const ref = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
  if (ref.current === null) return;
  if (latitude === null || longitude === null) return;

  const initMaps = () => {
   setTimeout(() => {});
   const map = new naver.maps.Map(ref.current!, {
    center: new naver.maps.LatLng(latitude, longitude),
    zoom: 15,
    draggable: false,
   });

   new naver.maps.Marker({
    position: new naver.maps.LatLng(latitude, longitude),
    map: map,
   });
  };

  setTimeout(() => {
   initMaps();
  }, 0);
 }, [latitude, longitude]);

 return (
  <Layout hasTabBar title="나의 동네">
   <div className="px-4 pt-4">
    <div ref={ref} style={{width: '100%', height: '11vh'}}>
     <div className="animate-pulse flex space-x-4 w-full h-full">
      <div className="bg-slate-700 w-full h-full"></div>
     </div>
    </div>
   </div>
  </Layout>
 );
};

export async function getStaticProps() {
 console.log('BUILDING COMM. STATICALLY');
 const posts = await client.post.findMany({include: {user: true}});

 return {
  props: {
   posts: JSON.parse(JSON.stringify(posts)),
  },
  revalidate: 120,
 };
}

export default Community;
