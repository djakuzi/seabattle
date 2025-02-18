import { JSX } from "react";
import { Outlet } from "react-router-dom";

export default function Auth(): JSX.Element {
    return (
       <Outlet></Outlet>
    );
};