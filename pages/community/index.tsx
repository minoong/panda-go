import {Post, User} from '@prisma/client';
import {NextPage} from 'next';
import client from '@libs/server/client';
import useCoords from '@libs/client/useCoords';
import {useEffect, useRef, useState} from 'react';

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
  <div>
   {latitude}, {longitude}
   <div ref={ref} style={{width: '100%', height: '40vh'}} />
  </div>
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
