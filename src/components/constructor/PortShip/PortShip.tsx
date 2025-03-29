import styles from './PortShip.module.css';
import cn from "classnames";
import { JSX } from "react";
import Ship from '../../general/Ship/Ship';
import { PropsShip } from './PortShip.props';
import IMGscrew from '../../../assets/icons/constructor/screw.svg';
import IMGtree from '../../../assets/image/constructor/tree.webp';

export default function PortShip({ widthRect, cls}:PropsShip): JSX.Element {
    const objWidthRect = {
        'one': widthRect,
        'two': widthRect * 2,
        'three': widthRect * 3,
        'four': widthRect * 4
    };

    return (
        <div className={cn(styles['constructor'], cls)}>
            <div className={styles['contsturtor-title']}>Расставь корабли</div>
            {/* <div className={styles['constructor-screw']} >
                <div className={styles['constructor-screw__item']}> 
                    <img src={IMGscrew} alt="винт"/>
                </div>
                <div className={styles['constructor-screw__item']}>
                    <img src={IMGscrew} alt="винт"/>
                </div>
            </div> */}
            <div className={styles['contsturtor-positon__port-station']} >
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.four + 'px' }} data-port-ship>
                    <div className={styles['constructor-rect']} />
                    <div className={styles['constructor-rect']} />
                    <div className={styles['constructor-rect']} />
                    <div className={styles['constructor-rect']} />
                    <Ship size={4} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
            </div>
            <div className={styles['contsturtor-positon__port-station']}>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.three + 'px' }} data-port-ship>
                    <div className={styles['constructor-rect']} />
                    <div className={styles['constructor-rect']} />
                    <div className={styles['constructor-rect']} />
                    <Ship size={3} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.three + 'px' }} data-port-ship>
                    <div className={styles['constructor-rect']} />
                    <div className={styles['constructor-rect']} />
                    <div className={styles['constructor-rect']} />
                    <Ship size={3} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
            </div>
            <div className={styles['contsturtor-positon__port-station']}>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.two + 'px' }} data-port-ship>
                    <div className={styles['constructor-rect']} />
                    <div className={styles['constructor-rect']} />
                    <Ship size={2} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.two + 'px' }} data-port-ship>
                    <div className={styles['constructor-rect']} />
                    <div className={styles['constructor-rect']} />
                    <Ship size={2} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.two + 'px' }} data-port-ship>
                    <div className={styles['constructor-rect']} />
                    <div className={styles['constructor-rect']} />
                    <Ship size={2} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
            </div>
            <div className={cn(styles['contsturtor-positon__port-station'], styles["--one"])}>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.one + 'px' }} data-port-ship>
                    <Ship size={1} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.one + 'px' }} data-port-ship>
                    <Ship size={1} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.one + 'px' }} data-port-ship>
                    <Ship size={1} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.one + 'px' }} data-port-ship>
                    <Ship size={1} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
            </div>
        </div>
    );
}