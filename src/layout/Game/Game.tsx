import { JSX, useEffect, useRef } from "react";
import styles from './Game.module.css';
import changeTheme from "../../scripts/visual/changeTheme";
import ChangeTheme from "../../components/ChangeTheme/ChangeTheme";
import Logo from "../../components/Logo/Logo";
import MainScreenSlider from "../../components/MainScreenSlider/MainScreenSlider";
import audioOnOff from "../../scripts/visual/audioMainMenu";
import AUDIOmain from "../../assets/audio/mainMenu.mp3";
// import parallax from "../../scripts/visual/parallax";

export default function Game(): JSX.Element {

    const audioRef = useRef(null);

    useEffect(()=> {
        if (audioRef) {
            audioOnOff(audioRef.current);
        }

        changeTheme('set');
    },[]);
    
    return (
        <div className={styles["game"]}>
            <div className={styles["game-window"]}>
                <div className={styles['game-interaction']}>
                    <ChangeTheme className={styles['game-interaction__item']} />
                </div>

                <Logo className={styles['game-logo']} size="big"></Logo>

                <MainScreenSlider></MainScreenSlider>
            </div>
            <audio ref={audioOnOff} src={AUDIOmain} loop></audio>
        </div>
    );
};

