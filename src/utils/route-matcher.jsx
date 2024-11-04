export const matchRoute = (path, routeConfig) => {
  const matchedRoute = Object.keys(routeConfig).find((route) =>
    new RegExp(route).test(path)
  );
  return matchedRoute ? routeConfig[matchedRoute] : null;
};
