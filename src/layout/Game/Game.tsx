import { JSX, useEffect, useRef, useState } from "react";
import styles from './Game.module.css';
import changeTheme from "../../scripts/visual/changeTheme";
import ChangeTheme from "../../components/general/ChangeTheme/ChangeTheme";
import Logo from "../../components/general/Logo/Logo";
import MainScreenSlider from "../../components/mainMenu/MainScreenSlider/MainScreenSlider";
import audioOnOff from "../../scripts/visual/audioMainMenu";
import AUDIOmain from "../../assets/audio/mainMenu.mp3";
import { useAspectRatio } from "../../hooks/general/getAspectRatioScreen";
// import parallax from "../../scripts/visual/parallax";

export default function Game(): JSX.Element {

    const audioRef = useRef(null);
    const aspectRatio = useAspectRatio();

    useEffect(() => {
        if (audioRef.current) {
            audioOnOff(audioRef);
        }
    }, []);

    useEffect(() => {
        changeTheme('set');
    }, []);

    return (
        <div className={styles["game"]} data-aspect-ratio={aspectRatio}>
            <div className={styles["game-window"]}>
                <div className={styles['game-interaction']}>
                    <div>{aspectRatio}</div>
                    <ChangeTheme className={styles['game-theme']} />
                    <Logo cls={styles['game-logo']} size="big"></Logo>
                </div>

                <MainScreenSlider></MainScreenSlider>
            </div>
            <audio ref={audioOnOff} src={AUDIOmain} loop muted></audio>
        </div>
    );
};


