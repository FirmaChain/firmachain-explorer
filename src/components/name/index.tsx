import { ibcConfig } from '@/configs';
import { Theme, Typography } from '@mui/material';
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

    const typoProps = {
        className,
        sx: (theme: Theme) => ({
            color: theme.palette.custom.fonts.highlight,
            wordBreak: 'break-all',
            '&:hover': {
                cursor: 'pointer'
            }
        })
    };

    return explorerUrl ? (
        <Typography variant="body1" component="a" target="_blank" rel="noreferrer" href={`${explorerUrl}/${address}`} {...typoProps}>
            {name}
        </Typography>
    ) : (
        <Link to={href(address)}>
            <Typography variant="body1" {...typoProps}>
                {name}
            </Typography>
        </Link>
    );
};

export default Name;
