import { JSX, useEffect, useRef, useState} from "react";
import styles from './MainScreenSlider.module.css';
import cn from "classnames";
import { PropsMainScreenSlider } from "./MainScreenSlider.props";
import ScreenMenu from "../ScreenMenu/ScreenMenu";
import Profile from "../ScreenProfile/ScreenProfile";
import Settings from "../ScreenSettings/ScreenSettings";
import { toggleScreen } from "../../data/dataComponents";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionsMainSliderScreen } from "../../redux/slice/mainSliderScreen";


export default function MainScreenSlider({ className = '' }: PropsMainScreenSlider): JSX.Element {

    const cls = styles['screen'] + ' ' + className;
    const dispatch = useDispatch();
    const activeScreen = useSelector((state: RootState) => state.sliderScreen.screen);

    const refSlider = useRef<HTMLDivElement>(null);

    function setScreen(name: string):void {
        if (!refSlider.current) return;

        const index = toggleScreen.findIndex( el => el.name == name) ;
        const width = index * refSlider.current.offsetWidth * -1;

        refSlider.current.style.transform = 'translateX(' + width + 'px)';

        if (name !== activeScreen) dispatch(actionsMainSliderScreen.changeScreen(name));
    }

    useEffect(() => {
        if (refSlider.current) {
            refSlider.current.style.transform = 'translateX(-1650px)';
        }

        setScreen(activeScreen);
        window.addEventListener('resize', () => setScreen(activeScreen));
    }, []);

    return (
        <div className={cls}>
            <div ref={refSlider}className={styles["screen__slider"]}>
                <Profile/>
                <ScreenMenu/>
                <Settings/>
            </div>
            <div className={styles['screen__panel']}>
                {...toggleScreen.map((el, i) => {
                    return (
                        <div key={i} data-index={i} onClick={() => setScreen(el.name)} className={cn(styles['panel__item'], {
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
