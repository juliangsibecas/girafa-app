import { useState } from 'react';
import { UserContext } from './context';

export const UserProvider: React.FC = ({ children }) => {
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
