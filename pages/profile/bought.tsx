import Layout from '@components/layout';
import ProductList from '@components/product-list';
import {NextPage} from 'next';

const Bought: NextPage = () => (
 <Layout title="구매내역" canGoBack>
  <div className="flex flex-col space-y-5 pb-10  divide-y">
   <ProductList kind="sales" />
  </div>
 </Layout>
);

export default Bought;
