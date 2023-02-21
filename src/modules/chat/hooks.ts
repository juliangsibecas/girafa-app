import { useContext } from 'react';
import { ChatContext } from './context';

export const useChats = () => {
  const context = useContext(ChatContext);

  if (!context) throw new Error();

  return context;
};
