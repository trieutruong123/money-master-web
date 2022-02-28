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
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { userStore } from 'store';

interface IProps{
  content:any,
}


export const AccountProfile = observer(({content}:IProps) => {
  const [user,setUser] = useState({
    avatar: '/images/avatar_1.png',
    city: '',
    country: '',
    jobTitle: '',
    name: '',
    timezone: '',
  });
  useEffect(()=>{
    const email = userStore.user?.email||'';
    setUser({...user, name:email });
  },[])

  return (
    <Card >
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {user.name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {`${user.city} ${user.country}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          {content.uploadPicture}
        </Button>
      </CardActions>
    </Card>
  );
});
