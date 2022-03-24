import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { authStore, userStore } from 'store';
import { storageService, userService } from 'services';
import { mainConstant } from 'helpers';
import { CircularLoading } from 'components';

export const AuthGuard = observer(({ children }: { children: JSX.Element }) => {
  const router = useRouter();

  //if auth token is exist, fetch user info and verify token;
  useEffect(() => {
    if (userService.isAuthToken()) {
      const check = userService.fetchUserInfo();
      //invalid token or internal server error;
      if (!check) {
        router.push('/sign-in');
      }
    }
  }, []);

  // manage login progress
  useEffect(() => {
    if (!authStore.isAuthenticating) {
      //auth is initialized and there is no user
      if (!userStore.user) {
        // remember the page that user tried to access
        storageService.setSessionStorage(
          mainConstant.REDIRECT_KEY,
          router.route,
        );
        router.push('/sign-in');
      }
    }
  }, [authStore.isAuthenticating, userStore.user, router, storageService]);

  /* show loading indicator while the auth provider is still initializing */
  if (authStore.isAuthenticating) {
    return <CircularLoading isLoading={authStore.isAuthenticating} />;
  }

  // if auth initialized with a valid user show protected page
  if (!authStore.isAuthenticating && userStore.user) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
});
