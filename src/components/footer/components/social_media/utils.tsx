import React from 'react';
import { GithubIcon, MediumIcon, TelegramIcon, TwitterIcon } from '@icons';

export const socialMediaLinks: {
    component: React.ReactNode;
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
