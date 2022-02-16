import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './config';

export const firebaseService = {
  googleLogin,
  googleLogout,
  facebookLogin,
  facebookLogout,
};

const googleProvider = new GoogleAuthProvider();

async function googleLogin() {
  const respnose: any = await signInWithPopup(auth, googleProvider)
    .then((result: any) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
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
      throw { errorCode, errorMessage, email, credential };
    });
}

async function facebookLogin() {}

function googleLogout() {
  auth.signOut();
}

function facebookLogout() {}
