import React from 'react';
import { Box, Typography } from '@mui/material';
import { useBigDipperNetworksStore,  readNetworks  } from '@zustand/big_dipper_networks';

import { SingleNetwork } from './components';

const Networks: React.FC<{
    className?: string;
}> = ({ className }) => {
    const networks = useBigDipperNetworksStore(readNetworks);

    return (
        <Box className={className}>
            {networks.map((x) => (
                <Box
                    key={x.name}
                    sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        '& img': {
                            width: '25px',
                            mr: 2
                        },
                        '& .network': {
                            flex: 1,
                            minWidth: 0
                        }
                    })}
                >
                    <img src={x.logo} alt="logo" />
                    <div className="network">
                        <Typography variant="h4">{x.name}</Typography>
                        {x.mainnet.map((network) => (
                            <SingleNetwork
                                className="mainnet"
                                key={network.chainId}
                                url={network.url}
                                name={network.name}
                                chainId={network.chainId}
                            />
                        ))}
                        {x.testnet.map((network) => (
                            <SingleNetwork
                                className="testnet"
                                key={network.chainId}
                                url={network.url}
                                name={network.name}
                                chainId={network.chainId}
                            />
                        ))}
                        {x.retired.map((network) => (
                            <SingleNetwork
                                className="retired"
                                key={network.chainId}
                                url={network.url}
                                name={network.name}
                                chainId={network.chainId}
                            />
                        ))}
                        {x.other.map((network) => (
                            <SingleNetwork
                                className="other"
                                key={network.chainId}
                                url={network.url}
                                name={network.name}
                                chainId={network.chainId}
                            />
                        ))}
                    </div>
                </Box>
            ))}
        </Box>
    );
};

export default Networks;
