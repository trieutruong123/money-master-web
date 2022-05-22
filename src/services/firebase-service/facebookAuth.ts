import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, signOutMethod } from './config';

export const facebookAuth = {
  facebookLogin,
  signOut,
};

const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');

async function facebookLogin() {
  const response: any = await signInWithPopup(auth, facebookProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      return { isError: true, data: { user, credential, accessToken } };
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      return {
        isError: false,
        data: { errorCode, errorMessage, email, credential },
      };
    });
  return response;
}

function signOut() {
  signOutMethod();
}
