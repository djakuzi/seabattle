import { JSX, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from './Game.module.css';
import changeTheme from "../../scripts/visual/changeTheme";

export default function Game(): JSX.Element {
    const navigate = useNavigate();

    useEffect(()=> {
        changeTheme('set');
        navigate('/menu');
    },[]);
    
    return (
        <div className={styles["game"]}>
            <Outlet></Outlet>
        </div>
    );
};