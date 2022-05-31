import { createContext } from 'react';
import { Maybe } from '../types';
import { ThemeContextValues } from './types';

export const ThemeContext = createContext<Maybe<ThemeContextValues>>(null);
