export type AuthContextValues = {
  isSignedIn: boolean;
  userId: string;
  accessToken: string;

  signIn: (payload: SignInPayload) => void;
  signOut: () => void;

  isLoading: boolean;
};

export type SignInPayload = {
  userId: string;
  accessToken: string;
  refreshToken: string;
};
