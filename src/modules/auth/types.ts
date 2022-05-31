export type AuthContextValues = {
  isSignedIn: boolean;
  userId: string;

  signIn: (payload: SignInPayload) => void;
  signOut: () => void;
};

export type SignInPayload = {
  userId: string;
  accessToken: string;
  refreshToken: string;
};
