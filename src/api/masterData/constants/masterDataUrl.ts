export const masterDataUrl: (path: string) => string = (
  path: string,
): string => {
  return "https://localhost:7127/api" + path;
};
