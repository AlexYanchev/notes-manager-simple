// FastInputEdit.tsx

import React, { FC } from 'react';

interface FastInputEditProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FastInputEdit: FC<FastInputEditProps> = React.memo(
  ({ children, onSubmit }) => {
    return (
      <form onSubmit={onSubmit}>
        {children}

        <button type='submit' className='text-xs'>
          Готово
        </button>
      </form>
    );
  }
);

export default FastInputEdit;
