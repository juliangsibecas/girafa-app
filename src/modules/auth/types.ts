export type AuthContextValues = {
  isSignedIn: boolean;
  userId: string;

  signIn: (payload: SignInPayload) => void;
  signOut: () => void;

  isLoading: boolean;
};

export type SignInPayload = {
  userId: string;
  accessToken: string;
  refreshToken: string;
};
