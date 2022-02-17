import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { DefaultNavbar, DefaultLayout, Link } from 'components';

const Docs = () => {
  return (
    <>
      <DefaultNavbar />
      <h1>Welcome to Money Master Documentation Page</h1>
      <Link href="/">
        <h1>Back to Homepage</h1>
      </Link>
    </>
  );
};
Docs.getLayout = (page: ReactJSXElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);
export default Docs;
