import styles from './ScreenProfile.module.css';
import cn from "classnames";
import { JSX } from "react";
import { PropsScreenProfile } from "./ScreenProfile.props";
import TitlePage from '../../general/TitlePage/TitlePage';
import { profileMenu } from '../../../data/dataComponents';

export default function ScreenProfile({ className = '', inputRef}:PropsScreenProfile): JSX.Element {
    // const cls = styles["profile"] + ` ${className}`;

    return (
        <div ref={inputRef} className={cn(styles["profile"], className)}>
            <div className={styles["profile__wrapper"]}>
                <TitlePage className={styles['title-page']}>Профиль</TitlePage>

                <div className={styles['profile-menu']}>
                    {...profileMenu.map((el, i) => {
                        return (
                            <div key={i} data-profile-name={el.name} className={cn(styles['profile-menu__item'], {
                                [styles['--exit']]: 'exit' === el.name,
                            })}>
                                {el.title}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}