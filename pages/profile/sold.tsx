import Layout from '@components/layout';
import {NextPage} from 'next';

const Sold: NextPage = () => (
 <Layout title="판매내역" canGoBack>
  <div className="flex flex-col space-y-5 pb-10  divide-y">{/* <ProductList kind="sales" /> */}</div>
 </Layout>
);

export default Sold;