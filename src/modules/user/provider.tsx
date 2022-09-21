import { useState } from 'react';
import { UserContext } from './context';

type Props = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [pictureVersion, setPictureVersion] = useState(0);

  const updatePictureVersion = () => setPictureVersion(pictureVersion + 1);

  return (
    <UserContext.Provider
      value={{
        pictureVersion,
        updatePictureVersion,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
