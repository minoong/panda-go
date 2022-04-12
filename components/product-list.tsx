import {ProductWithCount} from 'pages';
import React from 'react';
import useSWR from 'swr';
import Item from './item';

interface ProductListProps {
 kind: 'favs' | 'sales' | 'purchases';
}

interface Record {
 id: number;
 product: ProductWithCount;
}

interface ProductListResponse {
 [key: string]: Record[];
}

const ProductList: React.FC<ProductListProps> = ({kind}) => {
 const {data} = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
 return data ? (
  <>
   {data[kind]?.map((record) => (
    <Item
     key={record.id}
     id={record.product.id}
     title={record.product.name}
     price={record.product.price}
     hearts={record.product._count.favs}
     image={record.product.image}
    />
   ))}
  </>
 ) : null;
};

export default ProductList;
