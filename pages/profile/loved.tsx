import Layout from '@components/layout';
import {NextPage} from 'next';

const Loved: NextPage = () => (
 <Layout title="관심목록" canGoBack>
  <div className="flex flex-col space-y-5 pb-10  divide-y">{/* <ProductList kind="sales" /> */}</div>
 </Layout>
);

export default Loved;
