import LOGOMenu from '../assets/icons/menu/menu.svg';
import LOGOProfile from '../assets/icons/profile/profile.svg';
import LOGOSettings from '../assets/icons/settings/settings.svg';

export const toggleScreen = [
  {
    name: 'profile',
    icon: LOGOProfile,
  },
  {
    name: 'menu',
    icon: LOGOMenu,
  },
  {
    name: 'settings',
    icon: LOGOSettings,
  },
];


export const profileMenu = [
  {
    title: 'профиль',
    name: 'profile',
  },
  {
    title: 'друзья',
    name: 'friends',
  },
  {
    title: 'статистика',
    name: 'statistics',
  },
  {
    title: 'список боев',
    name: 'listFights',
  },
  {
    title: 'выйти',
    name: 'exit',
  },
];

export const variantPlay = [
  {
    type: 'bot',
    title: 'С БОТОМ',
  },
  {
    type: 'online',
    title: 'ОНЛАЙН',
  },
  {
    type: 'tournament',
    title: 'ТУРНИР',
  },
  {
    type: 'invite',
    title: 'ПО ПРИГЛАШЕНИЮ',
  },
];
