import { chainConfig } from '@configs';
import { ENV } from '@configs/env';
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import clsx from 'clsx';

const Network = ({ className }: { className?: string }) => {
    const chainStatus = ENV.CHAIN_TYPE || ENV.CHAIN_STATUS;
    const isMainnet = chainStatus === 'mainnet';

    const networks = [
        {
            label: 'colosseum-1',
            key: 'mainnet',
            url: 'https://explorer.firmachain.dev'
        },
        {
            label: 'imperium-4',
            key: 'testnet',
            url: 'https://explorer-testnet.firmachain.dev'
        }
    ];

    const currentNetwork = isMainnet ? networks[0] : networks[1];

    const handleChange = (event: any) => {
        const url = event.target.value;
        if (url && url !== currentNetwork.url) {
            window.open(url, '_blank');
        }
    };

    return (
        <FormControl className={clsx(className)} size="small">
            <Select
                value={currentNetwork.url}
                onChange={handleChange}
                sx={(theme) => ({
                    height: '40px',
                    background: theme.palette.background.paper,
                    color: theme.palette.custom.fonts.fontTwo,
                    borderRadius: `${theme.shape.borderRadius}px`,
                    '& .MuiSelect-select': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: theme.spacing(1),
                        p: theme.spacing(0.8, 2)
                    },
                    '& .icon': {
                        width: 24
                    },
                    '& fieldset': {
                        border: 'none'
                    }
                })}
                renderValue={() => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img src={chainConfig.icon} className="icon" alt="icon" />
                        <Typography variant="body1">{currentNetwork.label}</Typography>
                    </Box>
                )}
            >
                {networks.map((network) => (
                    <MenuItem key={network.key} value={network.url} disabled={network.key === (isMainnet ? 'mainnet' : 'testnet')}>
                        {network.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Network;
