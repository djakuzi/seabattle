import { ReactNode } from 'react';

export interface PropsButton {
  paramsLink?: {
        type: string;
        link: string;
    } | undefined;

  paramsBtn?: {
        type: string;
  } | undefined;
  
  onClick: (...args: unknown[]) => void;
  cls: string;
  children: ReactNode;
}
