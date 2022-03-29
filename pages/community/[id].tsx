import Layout from '@components/layout';
import Textarea from '@components/Textarea';
import useMutation from '@libs/client/useMutation';
import {cls} from '@libs/utils';
import {Answer, Post, User} from '@prisma/client';
import {NextPage} from 'next';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import useSWR from 'swr';

interface AnswerWithUser extends Answer {
 user: User;
}

interface PostWithUser extends Post {
 user: User;
 _count: {
  answers: number;
  wondering: number;
 };
 answers: AnswerWithUser[];
}

interface CommunityPostResponse {
 ok: boolean;
 post: PostWithUser;
 isWondering: boolean;
}

interface AnswerForm {
 answer: string;
}

interface AnswerResponse {
 ok: boolean;
 response: Answer;
}

const CommunityPostDetail: NextPage = () => {
 const router = useRouter();
 const id = router.query.id;
 const ref = useRef<HTMLDivElement | null>(null);
 const naverMapsRef = useRef<naver.maps.Map>();

 const {register, handleSubmit, reset} = useForm<AnswerForm>();
 const {data, isValidating, mutate} = useSWR<CommunityPostResponse>(id ? `/api/posts/${id}` : null);
 const [wonder, {loading}] = useMutation(`/api/posts/${id}/wonder`);
 const [sendAnswer, {data: answerData, loading: answerLoading}] = useMutation<AnswerResponse>(`/api/posts/${id}/answers`);

 const onWonderClick = () => {
  if (!data) return;

  mutate(
   {
    ...data,
    post: {
     ...data.post,
     _count: {
      ...data.post._count,
      wondering: data.isWondering ? data.post._count.wondering - 1 : data.post._count.wondering + 1,
     },
    },
    isWondering: !data.isWondering,
   },
   false,
  );

  if (!loading) {
   wonder({});
  }
 };

 const onValid = (form: AnswerForm) => {
  if (answerLoading) return;

  sendAnswer(form);
 };

 useEffect(() => {
  if (ref.current === null || isValidating || !data) return;
  const {latitude, longitude} = data.post;
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
  }, 0);
 }, [data, isValidating]);

 useEffect(() => {
  if (answerData && answerData.ok) {
   reset();
   mutate();
  }
 }, [answerData, reset, mutate]);

 return (
  <Layout canGoBack>
   <div>
    <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">동네질문</span>
    <div className="flex mb-3 px-4 cursor-pointer pb-3  border-b items-center space-x-3">
     <div className="w-10 h-10 rounded-full bg-slate-300" />
     <div>
      <p className="text-sm font-medium text-gray-700">{data?.post?.user?.name}</p>
      <Link href={`/users/profiles/${data?.post?.user?.id}`}>
       <a className="text-xs font-medium text-gray-500">View profile &rarr;</a>
      </Link>
     </div>
    </div>
    <div>
     <div className="mt-2 px-4 text-gray-700">
      <div ref={ref} style={{width: '100%', height: '12vh'}} className="rounded-md">
       <div className="animate-pulse flex space-x-4 w-full h-full">
        <div className="bg-slate-700 w-full h-full"></div>
       </div>
      </div>
     </div>
     <div className="mt-2 px-4 text-gray-700">
      <span className="text-orange-500 font-medium">Q.</span> {data?.post?.question}
     </div>
     <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
      <button onClick={onWonderClick} className={cls('flex space-x-2 items-center text-sm hover:scale-110', data?.isWondering ? 'text-teal-600' : '')}>
       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
       </svg>
       <span>궁금해요 {data?.post?._count?.wondering}</span>
      </button>
      <span className="flex space-x-2 items-center text-sm hover:scale-110 cursor-pointer">
       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth="2"
         d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        ></path>
       </svg>
       <span>답변 {data?.post?._count?.answers}</span>
      </span>
     </div>
    </div>
    <div className="px-4 my-5 space-y-5">
     {data?.post?.answers?.map((answer) => (
      <div key={answer.id} className="flex items-start space-x-3">
       <div className="w-8 h-8 bg-slate-200 rounded-full" />
       <div>
        <span className="text-sm block font-medium text-gray-700">{answer.user.name}</span>
        <span className="text-xs text-gray-500 block ">{answer.createdAt}</span>
        <p className="text-gray-700 mt-2">{answer.answer} </p>
       </div>
      </div>
     ))}
    </div>
    <form className="px-4" onSubmit={handleSubmit(onValid)}>
     <Textarea name="description" placeholder="Answer this question!" required register={register('answer', {required: true, minLength: 5})} />
     <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
      {answerLoading ? 'Loading...' : 'Reply'}
     </button>
    </form>
   </div>
  </Layout>
 );
};

export default CommunityPostDetail;
