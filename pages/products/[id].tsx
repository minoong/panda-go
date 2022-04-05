import {Product, User} from '@prisma/client';
import {GetStaticPaths, GetStaticProps} from 'next';
import React from 'react';
import client from '@libs/server/client';

interface ProductWithUser extends Product {
 user: User;
}

interface ItemDetailResponse {
 ok: boolean;
 product: ProductWithUser;
 relatedProducts: Product[];
 isLiked: boolean;
}

const ItemDetail = () => {
 return <div>ItemDetail</div>;
};

export const getStaticPaths: GetStaticPaths = () => {
 return {
  paths: [],
  fallback: true,
 };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
 if (!ctx?.params?.id) {
  return {
   props: {},
  };
 }

 const product = await client.product.findUnique({
  where: {
   id: +ctx.params.id.toString(),
  },
  include: {
   user: {
    select: {
     id: true,
     name: true,
     avatar: true,
    },
   },
  },
 });

 const terms = product?.name.split(' ').map((word) => ({
  name: {
   contains: word,
  },
 }));
 const relatedProducts = await client.product.findMany({
  where: {
   OR: terms,
   AND: {
    id: {
     not: product?.id,
    },
   },
  },
 });
 const isLiked = false;
 await new Promise((resolve) => setTimeout(resolve, 10000));

 return {
  props: {
   product: JSON.parse(JSON.stringify(product)),
   relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
   isLiked,
  },
 };
};

export default ItemDetail;
