import { generalConfig } from '@configs';
import { Box, Typography } from '@mui/material';
import { HOME } from '@utils/go_to_page';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router';

const Error = () => {
    const { t } = useTranslation();

    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                padding: theme.spacing(6),
                '& .MuiTypography-h2': {
                    marginBottom: theme.spacing(2)
                },
                '& .details': {
                    marginBottom: theme.spacing(5)
                },
                '& .container': {
                    maxWidth: '600px'
                }
            })}
        >
            <Box className="container">
                <Typography variant="h2">{t('common:errorTitle')}</Typography>
                <Typography className="details">
                    <Trans
                        i18nKey="common:errorDetails"
                        components={[
                            // eslint-disable-next-line
                            <a target="_blank" rel="noreferrer" href={generalConfig.github.reportIssue} />
                        ]}
                        values={{
                            issue: generalConfig.github.reportIssue
                        }}
                    />
                </Typography>
                <Link to={HOME}>
                    <Typography component="a">{t('common:errorHome')}</Typography>
                </Link>
            </Box>
        </Box>
    );
};

export default Error;
