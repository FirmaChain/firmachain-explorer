import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { NextSeo } from '@/adapters/seo/seo';
import { Box } from '@mui/material';

import { List } from './components';

const Validators = () => {
    const { t } = useTranslation('validators');
    return (
        <>
            <NextSeo
                title={t('validators')}
                openGraph={{
                    title: t('validators')
                }}
            />
                <Box
                    sx={(theme: any) => ({
                        ...theme.mixins.layout,
                        '& a': {
                            color: theme.palette.custom.fonts.highlight
                        }
                    })}
                >
                    <List />
                </Box>
        </>
    );
};

export default Validators;
