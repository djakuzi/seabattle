import { JSX, useEffect, useRef, useState} from "react";
import styles from './MainScreenSlider.module.css';
import cn from "classnames";
import { PropsMainScreenSlider } from "./MainScreenSlider.props";
import ScreenMenu from "../ScreenMenu/ScreenMenu";
import Profile from "../ScreenProfile/ScreenProfile";
import Settings from "../ScreenSettings/ScreenSettings";
import { toggleScreen } from "../../data/dataComponents";
// import { countWidthScreens, TypeWidthScreen } from "../../scripts/visual/screenSlider";

export default function MainScreenSlider({ className = '' }: PropsMainScreenSlider): JSX.Element {

    const cls = styles['screen'] + ' ' + className;
    // const [objWidthScreen, setobjWidthScreen] = useState<TypeWidthScreen>(null);
    const [activeScreen, setActiveScreen] = useState<string>('menu');

    const refSlider = useRef<HTMLDivElement>(null);
    const objSlider = {
        menu: useRef<HTMLDivElement>(null),
        profile: useRef<HTMLDivElement>(null),
        settings: useRef<HTMLDivElement>(null),
    };

    useEffect(() => {
        if (refSlider.current) {
            refSlider.current.style.transform = 'translateX(-1650px)';
        }
        // setobjWidthScreen(countWidthScreens(objSlider));
    }, []);

    function test(name: string):void {

        if (name == "profile" && refSlider.current) {
            console.log(name);
            refSlider.current.style.transform = 'translateX(0)';
            setActiveScreen(name);
        }

        if (name == "menu" && refSlider.current) {
            console.log(name);
            refSlider.current.style.transform = 'translateX(-1650px)';
            setActiveScreen(name);
        }
    }

    return (
        <div className={cls}>
            <div ref={refSlider}className={styles["screen__slider"]}>
                <Profile inputRef={objSlider.profile} />
                <ScreenMenu inputRef={objSlider.menu} />
                <Settings inputRef={objSlider.settings} />
            </div>
            <div className={styles['screen__panel']}>
                {...toggleScreen.map((el, i) => {
                    return (
                        <div key={i} onClick={() => test(el.name)} className={cn(styles['panel__item'], {
                            [styles['--active']]: activeScreen === el.name,
                        })}>
                            <img src={el.icon} alt={el.name} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
