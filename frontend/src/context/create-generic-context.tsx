import { createContext, useContext, ReactNode } from 'react';

export function createGenericContext<T>(useHook: () => T) {
  const Context = createContext<T | null>(null);

  const Provider = ({ children }: { children: ReactNode }) => {
    const value = useHook();
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useContextHook = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error('useContextHook must be used within its corresponding Provider');
    }
    return context;
  };

  return [Provider, useContextHook] as const;
}
