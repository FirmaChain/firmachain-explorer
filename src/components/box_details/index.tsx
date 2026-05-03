import { isValidElement, ReactNode } from 'react';
import { Box } from '@components';
import { Typography } from '@mui/material';

interface Props {
    className?: string;
    title?: string | ReactNode;
    titleAction?: ReactNode;
    details: {
        label: string | number | ReactNode;
        detail: string | number | ReactNode;
        className?: string;
    }[];
}

const BoxDetails = ({ className, title, titleAction, details }: Props) => {
    return (
        <Box
            className={className}
            sx={(theme) => ({
                overflow: 'hidden',
                '& .item': {
                    padding: theme.spacing(2, 0),
                    color: theme.palette.custom.fonts.fontTwo,
                    '&:first-child': {
                        paddingTop: 0
                    },
                    '&:last-child': {
                        paddingBottom: 0
                    },
                    '&:not(:last-child)': {
                        borderBottom: `solid 1px ${theme.palette.divider}`
                    },
                    '& .label': {
                        marginBottom: theme.spacing(1)
                    },
                    '& .detail': {
                        '&.MuiTypography-body1': {
                            wordWrap: 'break-word'
                        }
                    },
                    [theme.breakpoints.up('md')]: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        '& .label': {
                            marginBottom: 0
                        }
                    }
                }
            })}
        >
            {!!title && (
                <div className="header item">
                    {isValidElement(title) ? title : <Typography variant="h2">{title}</Typography>}
                    {!!titleAction && titleAction}
                </div>
            )}
            {details.map((x, i) => {
                return (
                    <div className={`item ${x.className ?? ''}`.trim()} key={`box-detail__item--${i}`}>
                        {isValidElement(x.label) ? (
                            <div className="label">{x.label}</div>
                        ) : (
                            <Typography variant="body1" className="label">
                                {x.label}
                            </Typography>
                        )}

                        {isValidElement(x.detail) ? (
                            <div className="detail">{x.detail}</div>
                        ) : (
                            <Typography variant="body1" className="detail">
                                {x.detail}
                            </Typography>
                        )}
                    </div>
                );
            })}
        </Box>
    );
};

export default BoxDetails;
