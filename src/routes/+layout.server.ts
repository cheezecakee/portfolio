export const load = async ({ url }: { url: URL }) => {
  return {
    page: {
      url: {
        pathname: url.pathname
      }
    }
  };
};

