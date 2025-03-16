import { JSX, useEffect, useRef, useState } from "react";
import styles from './Constructor.module.css';
import cn from "classnames";
import CoordRect from "../../components/general/CoordRect/CoordRect";
import Button from "../../components/general/Button/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import MoveShip from "../../scripts/game/setPositionShip";
import IMGbg from '../../assets/image/constructor/ship.jpg';
import IMGBang from '../../assets/icons/constructor/bang.png';
import IMGSearchShip from '../../assets/icons/constructor/search-tanker.svg';
import PortShip from "../../components/constructor/PortShip/PortShip";
import getWidthRect from "../../scripts/general/getWidthRect";

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
    const refBox = useRef<HTMLDivElement>(null);
    const [widthImg, setWidthImg] = useState<number>(30);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const typeGame = searchParams.get('typegame');
    const testGame = typeGame == "invite" || typeGame == "bot";

    const getWidth = ():void => {
        if (refBox.current) {
            setWidthImg(getWidthRect(refBox.current));
        }
    };

    const exit = ():void => {
        navigate(-1);
    };

    const play = ():void => {
        if (document.querySelector('[data-port-ship] [data-ship]')) return;
        alert('ready');
    };
    
    useEffect(()=> {
        getWidth();
        window.addEventListener("resize", getWidth);
        const classMoveShip = new MoveShip(refBox.current!, styles['--highlight']);
        classMoveShip.init();
        console.log(classMoveShip.arrCoordPuttingShip);

        return ():void => {
            classMoveShip.unInit();
            window.removeEventListener("resize", getWidth);
        };
    }, []);

    if (refBox.current && !typeGame) {
        return  (
            <div className={cn(styles['constructor'], styles['--error'])}>Произошла ошибка</div>
        );
    }
    
    return (
        <div className={cn(styles['constructor'])} style={{backgroundImage: `url(${IMGbg})`}}>
            <div className={styles['constructor__box']}>
                <div className={styles['constructor__action']}>
                    <Button cls={styles['constructor-action__exit']} paramsBtn={paramsBtnExit} onClick={exit}>Назад</Button>
                </div>
                <div className={styles['constructor__positon']}>
                    <CoordRect inputRef={refBox} cls={styles['constructor-positon__coord']} />
                    <PortShip widthImg={widthImg} cls={styles["contsturtor-positon__port"]}/>
                </div>
                <div className={styles['constructor__action']}>
                    <div className={styles['constructor-action__rules']}>

                    </div>
                    <Button cls={ cn(styles['constructor-action__play'], {
                        [styles['red']]: testGame
                    })} paramsBtn={paramsBtnPlay} onClick={play}>
                        {textbtn[typeGame + '']}
                        <div className={styles['constructor-action-play__bang']}>
                            <img src={testGame ? IMGBang : IMGSearchShip} alt="" />
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
};