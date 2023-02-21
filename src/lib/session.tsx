import firebase from "firebase/compat";
import { createContext, useContext, useEffect, useState } from "react";

export const LOCAL_STORAGE_SESSION_KEY = 'authee-session';

export interface Session {
  address: string;
  user: firebase.User;
  idToken: string;
}

const SessionContext = createContext<{ session: Session | null }>({
  session: null,
});

// export function SessionProvider({ children }: any) {
//   const [session, setSession] = useState<Session | null>(localStorage.getItem(LOCAL_STORAGE_SESSION_KEY));
//
//   // listen for token changes
//   // call setSession and write new token as a cookie
//   useEffect(() => {
//     return firebase.auth().onIdTokenChanged(async (user) => {
//       if (!user) {
//         setSession(null);
//         localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
//         return;
//       }
//       const idToken = await user.getIdToken();
//       setSession({
//         ...session,
//         user,
//         idToken,
//       });
//     });
//   }, []);
//
//   return (
//     <SessionContext.Provider value={{ session }}>
//       {children}
//     </SessionContext.Provider>
//   );
// }
//
// export const useAuth = () => {
//   return useContext(SessionContext);
// };
