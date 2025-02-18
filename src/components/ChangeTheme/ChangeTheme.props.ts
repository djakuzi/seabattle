import { ReactNode } from "react";

export interface PropsChangeTheme {
    children: ReactNode;
    className?: string;
    size?: 'big' | 'small' | "middle";
};