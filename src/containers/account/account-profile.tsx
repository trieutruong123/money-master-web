import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { content } from 'i18n';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { ImagePicker } from 'shared/components';
import { rootStore, userStore } from 'shared/store';
import { colorScheme } from 'utils';
import { content as i18n } from 'i18n';

interface IProps {
  translatedContent: any;
}


export const AccountProfile = observer(({ translatedContent }: IProps) => {
  const router = useRouter();
  const { locale } = router;
  const content = locale === 'vi' ? i18n['vi'].profilePage : i18n['en'].profilePage;

  const handleUploadPicture = async (data: any) => {
    const res = await userStore.updateUserAvatar(data);
    if (res && !res.isError) {
      rootStore.raiseNotification(
        i18n[rootStore.locale].success.update,
        "success"
      );
    }
    else {
      rootStore.raiseError(
        i18n[rootStore.locale].error.failedToLoadInitialData
      );
    }
  }
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {userStore.user && userStore.user?.profileImage ?
            <Avatar
              src={userStore.user.profileImage}
              sx={{
                height: 64,
                mb: 2,
                width: 64,
                fontSize: '3rem',
              }}
            />
            :
            <Avatar
              sx={{
                height: 64,
                mb: 2,
                width: 64,
                fontSize: '3rem',
                backgroundColor: userStore.user?.backgroundColor || colorScheme.gray200,
              }}
            >
              {userStore.user?.email?.charAt(0).toUpperCase()}
            </Avatar>
          }
          {userStore.user && userStore.user?.lastName && userStore.user?.firstName
            ? (<Typography color="textPrimary" gutterBottom variant="h5">
              {locale == 'vi'
                ? `${userStore.user?.lastName} ${userStore.user?.firstName}`
                : `${userStore.user?.firstName} ${userStore.user?.lastName}`
              }
            </Typography>) :
            <Typography color="textSecondary" variant="h5">
              {userStore.user?.email}
            </Typography>
          }


        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <ImagePicker content={content.uploadAvatar.uploadAvatar} onFinish={handleUploadPicture} variant='text' color='primary' />
      </CardActions>
    </Card>
  );
});
