import { JSX } from "react";
import styles from './ScreenMenu.module.css';
import TitlePage from "../TitlePage/TitlePage";
import { PropsScreenMenu } from "./ScreenMenu.props";

export default function ScreenMenu({inputRef}:PropsScreenMenu): JSX.Element {
    return (
        <div ref={inputRef} className={styles['menu']}>
            <div className={styles['menu__wrapper']}>
                <TitlePage className={styles['title-page']}>МЕНЮ</TitlePage>
                <div className={styles['menu__box']}>

                    <div className={styles['game']}>

                        <div className={styles['game__title']}>
                            ВЫБЕРИ ТИП ИГРЫ
                        </div>

                        <div className={styles['game__types']}>
                            <div className={styles['game__types-item']}>
                                <div className={styles['game__types-item-hide']}>С БОТОМ</div>
                                <div className={styles['game__types-item-front']}>С БОТОМ</div>
                                <div className={styles['game__types-item-back']}>ИГРАТЬ</div>
                            </div>

                            <div className={styles['game__types-item']}>
                                <div className={styles['game__types-item-hide']}>ОНЛАЙН</div>
                                <div className={styles['game__types-item-front']}>ОНЛАЙН</div>
                                <div className={styles['game__types-item-back']}>ИГРАТЬ</div>
                            </div>

                            <div className={styles['game__types-item']}>
                                <div className={styles['game__types-item-hide']}>ТУРНИР</div>
                                <div className={styles['game__types-item-front']}>ТУРНИР</div>
                                <div className={styles['game__types-item-back']}>ИГРАТЬ</div>
                            </div>

                            <div className={styles['game__types-item']}>
                                <div className={styles['game__types-item-hide']}>ПО ПРИГЛАШЕНИЮ</div>
                                <div className={styles['game__types-item-front']}>ПО ПРИГЛАШЕНИЮ</div>
                                <div className={styles['game__types-item-back']}>ИГРАТЬ</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['game__leaders']}>
                        Таблица лидеров
                    </div>
                </div>
            </div>
        </div>
    );
};