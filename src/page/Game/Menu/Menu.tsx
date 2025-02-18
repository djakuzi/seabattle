import { JSX } from "react";
import styles from './menu.module.css';
import Logo from "../../../components/Logo/Logo";
import TitlePage from "../../../components/TitlePage/TitlePage";

export default function Menu(): JSX.Element {
    return (
        <div className={styles['main']}>
            <div className={styles['interaction']}>
                <div>Профиль</div>
                <div>Настройки</div>
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
                            С БОТОМ
                        </div>

                        <div className={styles['game__types-item']}>
                            ОНЛАЙН
                        </div>

                        <div className={styles['game__types-item']}>
                            ТУРНИР
                        </div>

                        <div className={styles['game__types-item']}>
                            ПО ПРИГЛАШЕНИЮ
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