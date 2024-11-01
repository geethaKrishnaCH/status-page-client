import { createContext, useContext, useEffect, useState } from "react";

const LoaderContext = createContext({
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
});

export const LoaderProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => {
    setCount((prev) => prev + 1);
  };
  const hideLoader = () => {
    setCount((prev) => {
      if (prev === 0) return prev;
      else return prev - 1;
    });
  };

  useEffect(() => {
    if (count > 0) setIsLoading(true);
    else if (count <= 0) setIsLoading(false);
  }, [count]);

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export function useLoader() {
  return useContext(LoaderContext);
}
