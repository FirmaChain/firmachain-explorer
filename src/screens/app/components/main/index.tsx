import { AppProps } from '@/adapters/app/types';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useBigDipperNetworksRecoil } from '@zustand/big_dipper_networks';
import { useMarketRecoil } from '@zustand/market';
import { useSettingsRecoil } from '@zustand/settings';
import { useValidatorRecoil } from '@zustand/validators';
import Countdown from '@screens/countdown';
import InitialLoad from '@screens/initial_load';
import { ToastContainer } from 'react-toastify';

import { InnerApp } from '..';
import { useGenesis, useTheme } from './hooks';

const Main = (props: AppProps) => {
    // =====================================
    // init recoil values
    // =====================================
    useSettingsRecoil();
    useBigDipperNetworksRecoil();
    useMarketRecoil();
    const { loading } = useValidatorRecoil();

    // =====================================
    // general setup
    // =====================================
    const { muiTheme } = useTheme();
    const { genesisStarted, startGenesis } = useGenesis();

    let Component = null;

    if (!genesisStarted) {
        Component = <Countdown startGenesis={startGenesis} />;
    } else if (loading) {
        Component = <InitialLoad {...props.pageProps} />;
    } else {
        Component = <InnerApp {...props} />;
    }

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                hideProgressBar
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {Component}
        </ThemeProvider>
    );
};

export default Main;
