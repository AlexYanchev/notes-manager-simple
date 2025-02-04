// StorageProvider.tsx

import React, { useContext, useMemo, createContext, FC } from 'react';
import StorageService from '../services/storageService';
import { I_Note } from '../types/I_Note';

const StorageContext = createContext<StorageService<I_Note> | null>(null);

interface StorageProviderProps {
  children: React.ReactNode;
}

const StorageProvider: FC<StorageProviderProps> = ({ children }) => {
  const storage = useMemo(
    () => new StorageService<I_Note>(sessionStorage, 'notes'),
    []
  );

  return (
    <StorageContext.Provider value={storage}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorageNoteManagerContext = () => useContext(StorageContext);

export default StorageProvider;
