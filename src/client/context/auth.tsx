import { useRouter, useSegments } from 'expo-router';
import React from 'react';

type ProviderProps = {
  signIn: (user: any) => void;
  signOut: () => void;
  user: any;
};

const AuthContext = React.createContext({} as ProviderProps);

export function useAuth() {
  return React.useContext(AuthContext);
}

export type Props = {
  children: React.ReactNode;
};
function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    if (!user && !inAuthGroup) {
      router.replace('/sign-in');
    } else if (user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, segments]);
}
export function Provider(props: Props) {
  const [user, setAuth] = React.useState<any>(null);

  useProtectedRoute(user);

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
}
