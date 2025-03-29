import { JSX, useEffect, useRef, useState } from "react";
import styles from './Constructor.module.css';
import cn from "classnames";
import CoordRect from "../../components/general/CoordRect/CoordRect";
import Button from "../../components/general/Button/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import MoveShip, { IntrfStyle } from "../../scripts/constructor/setPositionShip";
import IMGbg from '../../assets/image/constructor/ship.jpg';
import IMGBang from '../../assets/icons/constructor/bang.png';
import IMGSearchShip from '../../assets/icons/constructor/search-tanker.svg';
import PortShip from "../../components/constructor/PortShip/PortShip";
import { useAspectRatio } from "../../hooks/general/getAspectRatioScreen";
import { useGetWidthRect } from "../../hooks/general/getWidthRect";

const paramsBtnPlay = {
    type: 'btn',
};

const paramsBtnExit = {
    type: 'btn',
};

const textbtn = {
    'bot': 'Порвать ботяру',
    'online':  'Найти соперника',
    'tournament': 'Найти соперника',
    'invite': 'ПОБЕДИ ТОВАРИЩА'
};

export default function Constructor(): JSX.Element {
    //ref
    const refCoordRect = useRef<HTMLDivElement>(null);
    const refConstructor = useRef<HTMLDivElement>(null);
    //another
    // const [widthImg, setWidthImg] = useState<number>(30);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    //custom hook
    const aspectRatio = useAspectRatio();
    const widthRect = useGetWidthRect(refCoordRect);

    const typeGame = searchParams.get('typegame');
    const testGame = typeGame == "invite" || typeGame == "bot";

    const exit = ():void => {
        navigate(-1);
    };

    const play = ():void => {
        if (document.querySelector('[data-port-ship] [data-ship]')) return;
        alert('ready');
    };
    
    useEffect(()=> {
        if (!refCoordRect.current) return;
        
        const objStyle: IntrfStyle = {
            highlight: styles['--highlight'],
            perimeter: styles['--perimeter'],
            putting: styles['--putting'],
        };
        const classMoveShip = new MoveShip(refCoordRect.current!, objStyle);
        classMoveShip.init();

        return ():void => {
            classMoveShip.unInit();
        };
    }, [aspectRatio]);

    // if (refCoordRect.current || !typeGame || widthRect === 0) {
    //     return  (
    //         <div className={cn(styles['constructor'], styles['--error'])}>Произошла ошибка</div>
    //     );
    // }
    
    return (
        <div ref={refConstructor} className={cn(styles['constructor'])} style={{ backgroundImage: `url(${IMGbg})` }} data-aspect-ratio={aspectRatio}>
            <div className={styles['constructor__box']}>
                <div className={styles['constructor__action']}>
                    <Button cls={styles['constructor-action__exit']} paramsBtn={paramsBtnExit} onClick={exit}>Назад</Button>
                </div>
                <div className={styles['constructor__positon']}>
                    <CoordRect inputRef={refCoordRect} cls={styles['constructor-positon__coord']} />
                    <PortShip widthRect={widthRect} cls={styles["contsturtor-positon__port"]}/>
                </div>
                <div className={styles['constructor__action']}>
                    <div className={styles['constructor-action__rules']}>
    
                    </div>
                    <Button cls={ cn(styles['constructor-action__play'], {
                        [styles['red']]: testGame
                    })} paramsBtn={paramsBtnPlay} onClick={play}>
                        <div className={styles['constructor-action-play__text']}>{textbtn[typeGame + '']}</div>
                        <div className={styles['constructor-action-play__bang']}>
                            <img src={testGame ? IMGBang : IMGSearchShip} alt="" />
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
};