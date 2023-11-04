export const identityUrl: (path: string) => string = (path: string): string => {
  return "https://krmicro-identity.azurewebsites.net/api" + path;
};
