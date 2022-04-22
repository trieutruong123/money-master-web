import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Typography, Button } from '@mui/material';

export const MultipleLanguage: React.FunctionComponent = (props: any) => {
  const { locale, locales, asPath, pathname, query } = useRouter();
  const router = useRouter();

  const links = locales?.map((lang) => {
    if (lang !== locale) {
      return (
        <Button
          key={lang}
          variant="text"
          onClick={() => {
            router.push({ pathname, query }, asPath, { locale: lang });
          }}
          sx={{ p:'1',...props }}
        >
          <Box
            flexDirection="row"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={`/languages/${lang}.svg`}
              alt={locale}
              width={36}
              height={28}
            />
            <Typography
              variant="body1"
              textTransform="uppercase"
              sx={{ ml: 1 }}
              color="primary"
            >
              {lang}
            </Typography>
          </Box>
        </Button>
      );
    }
  });

  return <>{links}</>;
};
