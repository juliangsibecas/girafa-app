import { createContext } from 'react';

import { Maybe } from '../../types';

import { ChatContextValues } from './types';

export const ChatContext = createContext<Maybe<ChatContextValues>>(null);
