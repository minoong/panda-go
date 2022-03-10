import Button from '@components/Button';
import Input from '@components/Input';
import Layout from '@components/layout';
import useMutation from '@libs/client/useMutation';
import useUser from '@libs/client/useUser';
import {NextPage} from 'next';
import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';

interface EditProfileFormProps {
 email?: string;
 phone?: string;
 name?: string;
 avatar?: FileList;
 formErrors?: string;
}

interface EditProfileResponse {
 ok: boolean;
 error?: string;
}

const EditProfile: NextPage = () => {
 const inputRef = useRef(null);
 const [avatarPreview, setAvatarPreview] = useState('');
 const {user} = useUser();
 const {
  register,
  setValue,
  handleSubmit,
  setError,
  formState: {errors},
  watch,
 } = useForm<EditProfileFormProps>();
 const [editProfile, {data, loading}] = useMutation<EditProfileResponse>(`api/users/me`);

 useEffect(() => {
  if (user?.name) setValue('name', user.name);
  if (user?.email) setValue('email', user.email);
  if (user?.phone) setValue('phone', user.phone);
  if (user?.avatar) setAvatarPreview(`https://imagedelivery.net/aSbksvJjax-AUC7qVnaC4A/${user?.avatar}/avatar`);
 }, [setValue, user?.avatar, user?.email, user?.name, user?.phone]);

 useEffect(() => {
  if (data && !data.ok && data.error) {
   setError('formErrors', {message: data.error});
  }
 }, [data, setError]);

 const avatar = watch('avatar');

 useEffect(() => {
  if (avatar && avatar.length > 0) {
   const file = avatar[0];
   setAvatarPreview(URL.createObjectURL(file));
  }
 }, [avatar]);

 const onValid = async ({email, phone, name, avatar}: EditProfileFormProps) => {
  if (loading) return;
  if ([email, phone, name].includes('')) {
   return setError('formErrors', {
    message: 'Email OR Phone number are required. You need to choose one.',
   });
  }

  if (avatar && avatar.length > 0 && user) {
   const {uploadURL} = await (await fetch(`/api/files`)).json();
   const form = new FormData();

   form.append('file', avatar[0], user.id + '');

   const {
    result: {id},
   } = await (
    await fetch(uploadURL, {
     method: 'POST',
     body: form,
    })
   ).json();

   editProfile({
    email,
    phone,
    name,
    avatarId: id,
   });
  } else {
   editProfile({
    email,
    phone,
    name,
   });
  }
 };

 return (
  <Layout canGoBack title="Edit Profile">
   <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
    <div className="flex items-center space-x-3">
     {avatarPreview ? (
      <Image src={avatarPreview} alt={user?.name} className="w-14 h-14 rounded-full bg-slate-500" />
     ) : (
      <div className="w-14 h-14 rounded-full bg-slate-500" />
     )}
     <label
      htmlFor="picture"
      className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
     >
      Change
      <input {...register('avatar')} id="picture" type="file" className="hidden" accept="image/*" />
     </label>
    </div>
    <Input register={register('name')} required={false} label="Name" name="name" type="text" autoFocus />
    <Input register={register('email')} required={false} label="Email address" name="email" type="email" />
    <Input register={register('phone')} required={false} label="Phone number" name="phone" type="text" kind="phone" />
    {errors.formErrors ? <span className="my-2 text-red-500 font-medium text-center block">{errors.formErrors.message}</span> : null}
    <Button text={loading ? 'Loading...' : 'Update profile'} />
   </form>
  </Layout>
 );
};

export default EditProfile;
