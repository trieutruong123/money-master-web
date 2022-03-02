import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, signOutMethod } from './config';

export const googleAuth = {
  googleLogin,
  signOut,
};

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');

async function googleLogin() {
  const respnose: any = await signInWithPopup(auth, googleProvider)
    .then((result: any) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      // The signed-in user info.
      console.log(credential);
      console.log(result);
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

function signOut() {
  signOutMethod();
}
