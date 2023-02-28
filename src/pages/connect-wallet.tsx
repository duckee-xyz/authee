import * as fcl from '@onflow/fcl';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

interface AccountProofData {
  // e.g. "Awesome App (v0.0)" - A human readable string to identify your application during signing
  appIdentifier: string;

  // e.g. "75f8587e5bd5f9dcc9909d0dae1f0ac5814458b2ae129620502cb936fde7120a" - minimum 32-byte random nonce as hex string
  nonce: string;
}

type AccountProofDataResolver = () => Promise<AccountProofData | null>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { token: context.query?.token ?? null } };
};

interface ConnectWalletProps {
  token?: string;
}

function ConnectWallet({ token }: ConnectWalletProps) {
  const [user, setUser] = useState({ loggedIn: null, addr: null });
  useEffect(() => fcl.currentUser.subscribe(setUser), []); // sets the callback for FCL to use

  const [message, setMessage] = useState('');

  useEffect(() => {
    const accountProofDataResolver = async () => {
      return {
        appIdentifier: 'Duckee (v1.0.0)',
        nonce: '75f8587e5bd5f9dcc9909d0dae1f0ac5814458b2ae129620502cb936fde7120a',
      };
    };
    fcl.config({
      'app.detail.icon': 'https://static.duckee.xyz/logo.png',
      'app.detail.title': 'Duckee',
      'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
      'discovery.authn.endpoint': 'https://fcl-discovery.onflow.org/testnet/authn',
      'discovery.authn.include': [
        '0x82ec283f88a62e65', // Dapper Wallet
      ],
      // 'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn', // Endpoint set to Testnet
      // 'discovery.authn.endpoint': 'https://fcl-discovery.onflow.org/api/testnet/authn',
      'fcl.accountProof.resolver': accountProofDataResolver,
    });

    const result = fcl.authenticate();
    setMessage(JSON.stringify(result));
  });

  return (
    <>
      <h1>{user?.addr ?? 'Not Logged In'}</h1>
      <p>{message}</p>
      {user.loggedIn && <button onClick={() => fcl.unauthenticate()}>Log Out</button>}
    </>
  );
}

export default ConnectWallet;
