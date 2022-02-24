import Head from 'next/head';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import NextLink from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { content } from 'i18n';
import { DefaultNavbar, DefaultLayout } from 'components';
import { useRouter } from 'next/router';

const NotFound = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale } = props.context;
  const router = useRouter();
  const detail = locale === 'vi' ? content['vi'] : content['en'];
  const { _404Page, landingPage } = detail;

  return (
    <>
      <Head>
        <title>{_404Page.title} | Money Master</title>
      </Head>
      <>
        <DefaultNavbar content={landingPage.navbar} />
        <Box
          component="main"
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            minHeight: '100%',
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography align="center" color="textPrimary" variant="h1">
                {_404Page.title}: {_404Page.content}
              </Typography>
              <Typography
                align="center"
                color="textPrimary"
                variant="subtitle2"
              >
                {_404Page.subContent}
              </Typography>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  alt="Under development"
                  src="/images/undraw_page_not_found_su7k.svg"
                  style={{
                    marginTop: 50,
                    display: 'inline-block',
                    maxWidth: '100%',
                    width: 560,
                  }}
                />
              </Box>
              <Button
                onClick={() => {
                  router.back();
                }}
                component="a"
                startIcon={<ArrowBackIcon fontSize="small" />}
                sx={{ mt: 3 }}
                variant="contained"
              >
                {_404Page.goBack}
              </Button>
              {/* <NextLink href="/dashboard" passHref>
                
              </NextLink> */}
            </Box>
          </Container>
        </Box>
      </>
    </>
  );
};

NotFound.getLayout = (page: ReactJSXElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      context,
    },
  };
};

export default NotFound;
