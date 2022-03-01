import Layout from '@components/layout';
import type {NextPage} from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
 return (
  <Layout title="Home" hasTabBar canGoBack>
   <Head>
    <title>Home</title>
   </Head>
   <div className="flex flex-col space-y-5 divide-y">
    <div>test</div>
   </div>
  </Layout>
 );
};

export default Home;
