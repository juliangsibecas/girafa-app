import { createContext } from 'react';

import { Maybe } from '../../types';

import { UserContextValues } from './types';

export const UserContext = createContext<Maybe<UserContextValues>>(null);
