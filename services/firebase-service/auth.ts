import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth, signOutMethod } from './config';

export const firebaseService = {
  googleLogin,
  facebookLogin,
  signOut,
};

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

async function googleLogin() {
  const respnose: any = await signInWithPopup(auth, googleProvider)
    .then((result: any) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('successfull!');
      console.log(user.displayName);
      console.log(user.email);
      console.log(result._tokenResponse.firstName);
      console.log(result._tokenResponse.lastName);
      console.log(user.photoURL);
      console.log(token);
      return {
        username: user.displayName,
        email: user.email,
        firstName: result._tokenResponse.firstName,
        lastName: result._tokenResponse.lastName,
        profilePictureUrl: user.photoURL,
        token: token,
      };
    })
    .catch((error: any) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log('failed');
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      console.log(credential);
      throw { errorCode, errorMessage, email, credential };
    });
}

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
