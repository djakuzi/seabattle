import { JSX } from "react";
import styles from './menu.module.css';
import Logo from "../../../components/Logo/Logo";
import TitlePage from "../../../components/TitlePage/TitlePage";

export default function Menu(): JSX.Element {
    return (
        <div className={styles['main']}>
            <div className={styles['main__wrapper']}>
                <div className={styles['main__interaction']}>
                    <div className={styles['main__interaction-item']}>Профиль</div>
                    <div className={styles['main__interaction-item']}>Настройки</div>
                </div>

                <Logo className={styles['logo']} size="big"></Logo>
                
                <div className={styles['game']}>

                    <TitlePage className={styles['title-page']}>МЕНЮ</TitlePage>

                    <div className={styles['game__wrapper']}>
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

                        <div className={styles['game__leaders']}>
                            Таблица лидеров
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};