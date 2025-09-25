export interface AppCookie {
  userToken: string;
  userRefreshToken: string;
}

export const cookiesKey = (prefix: string) => {
  return {
    userToken: prefix + "t",
    userRefreshToken: prefix + "rt",
  };
};
