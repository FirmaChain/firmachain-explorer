import React from 'react';
import CopyIcon from '@assets/icon-copy.svg?react';
import ShareIcon from '@assets/icon-share.svg?react';
import { Box } from '@components';
import { useScreenSize, useWindowOrigin } from '@hooks';
import { Dialog, Typography } from '@mui/material';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import classnames from 'classnames';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from 'react-share';

import { useOverview } from './hooks';

const Overview: React.FC<{
    className?: string;
    withdrawalAddress: string;
    address: string;
}> = ({ className, address, withdrawalAddress }) => {
    const { isDesktop } = useScreenSize();
    const { location } = useWindowOrigin();
    const { t } = useTranslation('accounts');
    const { open, handleClose, handleOpen, handleCopyToClipboard } = useOverview(t);

    const url = `${location}/accounts/${address}`;
    const hashTags = ['bigdipperexplorer', 'bigdipper'];
    return (
        <>
            <Dialog maxWidth="xl" onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <Box
                    sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        '& .MuiTypography-body1': { mb: 2 },
                        '& .dialog__share--wrapper': { mt: 2 },
                        '& .share-buttons:not(:last-child)': { mr: 1 },
                        '& .share-buttons.email circle': { fill: theme.palette.primary.main },
                        '& .icons svg': { width: theme.spacing(4.5), height: theme.spacing(4.5) }
                    })}
                >
                    <Typography variant="body1" align="center">
                        {t('scanForAddress')}
                    </Typography>
                    <QRCodeSVG value={address} size={200} bgColor="#ffffff" fgColor="#000000" />
                    <div className="dialog__share--wrapper">
                        <Typography variant="body1">{t('shareTo')}</Typography>
                        <div className="icons">
                            <FacebookShareButton url={url} quote={address} hashtag={hashTags[0]} className="share-buttons">
                                <FacebookIcon round />
                            </FacebookShareButton>
                            <TwitterShareButton url={url} title={address} hashtags={hashTags} className="share-buttons">
                                <TwitterIcon round />
                            </TwitterShareButton>

                            <TelegramShareButton url={url} title={address} className="share-buttons">
                                <TelegramIcon round />
                            </TelegramShareButton>

                            <WhatsappShareButton url={url} title={address} separator=":: " className="share-buttons">
                                <WhatsappIcon round />
                            </WhatsappShareButton>
                            <EmailShareButton url={url} subject="address" body={address} separator=":: " className="share-buttons email">
                                <EmailIcon round />
                            </EmailShareButton>
                        </div>
                    </div>
                </Box>
            </Dialog>
            <Box
                className={classnames(className)}
                sx={(theme) => ({
                    [theme.breakpoints.up('md')]: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' },
                    '& .item': {
                        borderBottom: 'none !important',
                        p: theme.spacing(2, 0),
                        color: theme.palette.custom.fonts.fontTwo,
                        '&:first-child': { pt: 0 },
                        '&:last-child': { pb: 0 },
                        '&:not(:last-child)': { borderBottom: `solid 1px ${theme.palette.divider}` },
                        '& .label': { mb: 1 },
                        [theme.breakpoints.up('md')]: {
                            p: 0,
                            '&:not(:last-child)': { borderBottom: 'none' },
                            '& .label': { mb: 0 }
                        }
                    },
                    '& .copyText .detail': {
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row-reverse',
                        justifyContent: 'flex-end',
                        '& svg': { width: '1rem', ml: 1 }
                    },
                    '& .actionIcon:hover': { cursor: 'pointer' }
                })}
            >
                <div className={classnames('copyText', 'item')}>
                    <Typography variant="body1" className="label">
                        {t('address')}
                    </Typography>
                    <div className="detail">
                        <CopyIcon onClick={() => handleCopyToClipboard(address)} className="actionIcon" />
                        <ShareIcon onClick={handleOpen} className="actionIcon" />
                        <Typography variant="body1" className="value">
                            {!isDesktop
                                ? getMiddleEllipsis(address, {
                                      beginning: 15,
                                      ending: 5
                                  })
                                : address}
                        </Typography>
                    </div>
                </div>

                <div className={classnames('copyText', 'item')}>
                    <Typography variant="body1" className="label">
                        {t('rewardAddress')}
                    </Typography>
                    <div className="detail">
                        <CopyIcon className="actionIcon" onClick={() => handleCopyToClipboard(withdrawalAddress)} />
                        <Typography variant="body1" className="value">
                            {!isDesktop
                                ? getMiddleEllipsis(withdrawalAddress, {
                                      beginning: 15,
                                      ending: 5
                                  })
                                : withdrawalAddress}
                        </Typography>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default Overview;
