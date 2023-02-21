import type { NextApiRequest, NextApiResponse } from 'next';
import { SignInRequest, SignInResponse } from '~/@types/auth';
import { firebaseAuth } from '~/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse<SignInResponse>) {
  const { idToken } = req.body as SignInRequest;
  const decoded = await firebaseAuth.verifyIdToken(idToken);

  console.log('Success');

  res.status(200).json({
    session: {
      address: decoded.uid,
      idToken,
    },
  });
}
