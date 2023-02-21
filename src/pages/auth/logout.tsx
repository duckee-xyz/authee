import { useEffect } from 'react';
import { LOCAL_STORAGE_SESSION_KEY } from '~/lib/session';

export default function Logout() {
  useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)) {
      return alert('You must log in first before logging out.');
    }
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
  });
  return <></>;
}
