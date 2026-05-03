import { ibcConfig } from '@/configs';
import { Typography } from '@mui/material';
import { ADDRESS_DETAILS } from '@utils/go_to_page';
import { Link } from 'react-router';

interface Props {
    className?: string;
    address: string;
    name: string;
    href?: (address: string) => string;
}

const Name = ({ className, address, name, href = ADDRESS_DETAILS }: Props) => {
    const getExplorerUrlForAddress = (addressIn: string): string | null => {
        const configEntry = Object.entries(ibcConfig).find(([_, config]) => config.display && addressIn.startsWith(config.display));
        return configEntry ? configEntry[1].explorer : null;
    };

    const explorerUrl = getExplorerUrlForAddress(address);

    return (
        <Link to={explorerUrl ? `${explorerUrl}/${address}` : href(address)}>
            <Typography
                variant="body1"
                className={className}
                component="a"
                target={explorerUrl ? '_blank' : ''}
                sx={(theme) => ({
                    color: theme.palette.custom.fonts.highlight,
                    wordBreak: 'break-all',
                    '&:hover': {
                        cursor: 'pointer'
                    }
                })}
            >
                {name}
            </Typography>
        </Link>
    );
};

export default Name;
