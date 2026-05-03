import { ReactNode } from 'react';
import GithubIcon from '@/assets/icon-github.svg?react';
import MediumIcon from '@/assets/icon-medium.svg?react';
import TelegramIcon from '@/assets/icon-telegram.svg?react';
import TwitterIcon from '@/assets/icon-twitter-x.svg?react';

export const socialMediaLinks: {
    component: ReactNode;
    url: string;
}[] = [
    {
        component: <TelegramIcon />,
        url: 'https://t.me/firmachainfct2'
    },
    {
        component: <GithubIcon />,
        url: 'https://github.com/firmachain'
    },
    {
        component: <TwitterIcon />,
        url: 'https://x.com/firmachain'
    },
    {
        component: <MediumIcon />,
        url: 'https://medium.com/firmachain'
    }
];
