import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, signOutMethod } from './config';

export const facebookAuth = {
  facebookLogin,
  signOut,
};

const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');

async function facebookLogin() {
  signInWithPopup(auth, facebookProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      console.log('successfull!');
      console.log(user);
      console.log(credential);
      console.log(accessToken);
      return { user, credential, accessToken };
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log('failed');
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      console.log(credential);

      throw { errorCode, errorMessage, email, credential };
    });
}

function signOut() {
  signOutMethod();
}
