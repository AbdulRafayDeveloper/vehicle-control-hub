import React, { createContext, useContext, useState, useMemo } from 'react';

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  /**
   * PageProvider is a component that wraps a part of your application
   * where you want the page-specific state to be accessible.
   *
   * It manages the state for the page and provides functions to update it.
   * By using this provider, any child components of page can access and modify the page state
   */
  const [pageState, setPageState] = useState({});

  const updatePageState = newStateOrFunction => {
    setPageState(prevState => {
      // Check if newStateOrFunction is a function
      if (typeof newStateOrFunction === 'function') {
        // If it's a function, call it with the previous state to get the new state
        return newStateOrFunction(prevState);
      }
      // If it's not a function, assume it's an object and replace it with the previous state
      return newStateOrFunction;
    });
  };

  const value = useMemo(
    () => ({
      pageState: { data: pageState },
      updatePageState,
    }),
    [pageState]
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePageContext = () => useContext(PageContext);

