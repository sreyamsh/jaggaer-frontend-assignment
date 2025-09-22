'use client';

import React, { useEffect, useState } from 'react';

// Simple global state for page title
let globalPageTitle = 'Products';
const titleListeners: Set<(title: string) => void> = new Set();

const setGlobalPageTitle = (title: string) => {
  globalPageTitle = title;
  titleListeners.forEach((listener) => listener(title));
};

// Hook for components to set page title
export const useSetPageTitle = (title: string) => {
  useEffect(() => {
    setGlobalPageTitle(title);

    // Cleanup: reset to default when component unmounts
    return () => {
      setGlobalPageTitle('Products');
    };
  }, [title]);
};

// Hook for Header to get current page title
export const usePageTitle = () => {
  const [pageTitle, setPageTitle] = useState(globalPageTitle);

  useEffect(() => {
    const listener = (newTitle: string) => setPageTitle(newTitle);
    titleListeners.add(listener);

    return () => {
      titleListeners.delete(listener);
    };
  }, []);

  return pageTitle;
};

// Provider component (no-op for this implementation)
export const PageTitleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return React.createElement(React.Fragment, null, children);
};
