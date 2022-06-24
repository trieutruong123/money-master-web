import { Typography, Grid, Container, Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { content as i18n } from 'i18n';
import { useRouter } from "next/router";
import APResetPassword from "./ap-reset-password-tab/ap-reset-password-main";
import { BreadcrumbsLink } from "shared/components";
import { APEditProfile } from "./ap-edit-profile-tab/ap-edit-profile";
import { APUploadAvatar } from "./ap-edit-profile-tab/ap-upload-avatar";

const APAccountProfile = observer(() => {
  const router = useRouter();
  const { locale } = router;

  const content = locale === 'vi' ? i18n['vi'].profilePage : i18n['en'].profilePage;

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flex: '1 1 auto',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ overflow: 'auto', width: '100%' }}>
          <Container>
            <BreadcrumbsLink urlArr={['/profile']} displayNameArr={['Profile']} />
            <Typography sx={{ mb: 3 }} variant="h4">
              {content.title}
            </Typography>
          </Container>

          <Grid container spacing={3}>
            <Grid item  xs={12}>
              <APUploadAvatar translatedContent={content} />
            </Grid>
            <Grid item  xs={12}>
              <APEditProfile translatedContent={content.editProfile} />
            </Grid>
            <Grid item  xs={12}>
              <APResetPassword />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
});

export default APAccountProfile;
