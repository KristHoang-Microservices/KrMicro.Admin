export const masterDataUrl: (path: string) => string = (
  path: string,
): string => {
  return "https://krmicro-masterdata.azurewebsites.net/api" + path;
};
