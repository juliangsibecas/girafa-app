import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { UserContext } from './context';

type Props = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [pictureVersion, setPictureVersion] = useState(0);

  useEffect(() => {
    const getPictureVersion = async () => {
      const v = await AsyncStorage.getItem('pictureVersion');

      setPictureVersion(Number(v));
    };

    getPictureVersion();
  }, []);

  const updatePictureVersion = async () => {
    setPictureVersion(pictureVersion + 1);
    await AsyncStorage.setItem('pictureVersion', String(pictureVersion + 1));
  };

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
