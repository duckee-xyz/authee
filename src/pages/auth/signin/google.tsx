import axios from 'axios';
import { getRedirectResult, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { SignInRequest, SignInResponse } from '~/@types/auth';
import { firebaseAuth } from '~/firebaseClient';
import { LOCAL_STORAGE_SESSION_KEY } from '~/lib/session';

async function doSignInWithGoogle() {
  const provider = new GoogleAuthProvider();
  await signInWithRedirect(firebaseAuth, provider);

  const result = await getRedirectResult(firebaseAuth);
  if (!result) {
    throw new Error('no redirect result');
  }
  const user = result.user;
  const idToken = await user.getIdToken();

  const resp = await axios.post('/api/signin', { idToken } as SignInRequest);
  const { session } = resp.data as SignInResponse;

  console.log(session);
  localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session));

  alert('Succeed');
}

export default function SignInWithGoogle() {
  doSignInWithGoogle().catch((err) => {
    console.error(err);
    alert(`Failed to Sign In with Google: ${err}`);
  });
  return <></>;
}
