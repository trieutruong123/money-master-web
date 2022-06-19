import Head from 'next/head';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { content } from 'i18n';
import { Box, Container } from '@mui/material';
import { DefaultLayout } from 'containers';
import RPResetPasswordPage from 'containers/reset-password/rp-reset-password-main';

const ResetPassword = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { locale } = props.context;

    return (
        <>
            <Head>
                <title>Reset password | Money Master</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <RPResetPasswordPage/>
                </Container>
            </Box>
        </>
    );
};

ResetPassword.getLayout = (page: ReactJSXElement) => (
    <DefaultLayout>{page}</DefaultLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            context,
        },
    };
};

export default ResetPassword;