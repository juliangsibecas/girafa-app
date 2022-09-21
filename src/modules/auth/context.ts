import { createContext } from 'react';

import { Maybe } from '../../types';

import { AuthContextValues } from './types';

export const AuthContext = createContext<Maybe<AuthContextValues>>(null);
