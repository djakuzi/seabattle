import { ReactNode } from "react";

export interface PropsTitlePage {
    children: ReactNode;
    className?: string;
    size?: 'big' | 'small' | "middle";
};