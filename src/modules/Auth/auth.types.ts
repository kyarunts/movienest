export type TSignupForm = {
  email: string;
  password: string;
  repeatPassword: string;
};

export type TSigninForm = {
  email: string;
  password: string;
  remember: boolean;
};

export type TTokenData = {
  accessToken: string;
  refreshToken: string;
};