import { JSX, useRef } from "react";
import styles from './MainScreenSlider.module.css';
import cn from "classnames";
import { PropsMainScreenSlider } from "./MainScreenSlider.props";
import ScreenMenu from "../ScreenMenu/ScreenMenu";
import Profile from "../ScreenProfile/ScreenProfile";
import Settings from "../ScreenSettings/ScreenSettings";
import { toggleScreen } from "../../../data/dataComponents";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionsMainSliderScreen } from "../../../redux/slice/mainSliderScreen";


export default function MainScreenSlider({ cls = '' }: PropsMainScreenSlider): JSX.Element {
    //redux screen
    const dispatch = useDispatch();
    const activeScreen = useSelector((state: RootState) => state.sliderScreen.screen);

    const refSlider = useRef<HTMLDivElement>(null);
    //style
    const inlineStyle = {
        screen: {
            transform: 'translate(-100%)',
        }
    };

    function setScreen(name: string): void {
        if (!refSlider.current) return;

        const index = toggleScreen.findIndex(el => el.name == name);
        const width = (index * 100) * -1;

        refSlider.current.style.transform = 'translateX(' + width + '%)';

        if (name !== activeScreen) dispatch(actionsMainSliderScreen.changeScreen(name));
    }

    return (
        <div className={cn(styles['screen'], cls)}>
            <div ref={refSlider} style={inlineStyle.screen} className={styles["screen__slider"]}>
                <Profile />
                <ScreenMenu />
                <Settings />
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
