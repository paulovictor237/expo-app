import { useRouter, useSegments } from 'expo-router';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type ProviderProps = {
  signIn: (user: any) => void;
  signOut: () => void;
  user: any;
};

export type Props = {
  children: ReactNode;
};

const AuthContext = createContext({} as ProviderProps);

export const useAuth = () => useContext(AuthContext);

export const Provider = (props: Props) => {
  const [user, setAuth] = useState<any>(null);

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    if (user && inAuthGroup) return router.replace('/');
    if (!user && !inAuthGroup) return router.replace('/sign-in');
  }, [user, segments]);

  return (
    <AuthContext.Provider
      value={{
        signIn: (user: any) => setAuth(user),
        signOut: () => setAuth(null),
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
