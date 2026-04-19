import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Layout } from '@components';
import NotFound from '@screens/404';
import AccountDetails from '@screens/account_details';
import App from '@screens/app';
import BlockDetails from '@screens/block_details';
import Blocks from '@screens/blocks';
import Home from '@screens/home';
import Params from '@screens/params';
import ProfileDetails from '@screens/profile_details';
import ProposalDetails from '@screens/proposal_details';
import Proposals from '@screens/proposals';
import TransactionDetails from '@screens/transaction_details';
import Transactions from '@screens/transactions';
import ValidatorDetails from '@screens/validator_details';
import Validators from '@screens/validators';
import { Navigate, Outlet, Route, Routes, useLocation, useParams } from 'react-router';

function RoutedComponent({ Component }: { Component: React.ComponentType<any> }) {
    return <App Component={Component} pageProps={{}} />;
}

function LegacyAccountRedirect() {
    const { address } = useParams();
    return <Navigate to={`/accounts/${address || ''}`} replace />;
}

function LegacyValidatorRedirect() {
    const { address } = useParams();
    return <Navigate to={`/validators/${address || ''}`} replace />;
}

function LegacyTransactionRedirect() {
    const { tx } = useParams();
    return <Navigate to={`/transactions/${tx || ''}`} replace />;
}

function AppLayoutRoute() {
    const { pathname } = useLocation();
    const { t: tBlocks } = useTranslation('blocks');
    const { t: tTransactions } = useTranslation('transactions');
    const { t: tProposals } = useTranslation('proposals');
    const { t: tValidators } = useTranslation('validators');
    const { t: tAccounts } = useTranslation('accounts');
    const { t: tParams } = useTranslation('params');
    const { t: tProfiles } = useTranslation('profiles');

    let navTitle: string | undefined;

    if (pathname === '/') navTitle = 'Block Explorer';
    else if (pathname === '/blocks') navTitle = tBlocks('blocks');
    else if (pathname.startsWith('/blocks/')) navTitle = tBlocks('blockDetails');
    else if (pathname === '/transactions') navTitle = tTransactions('transactions');
    else if (pathname.startsWith('/transactions/')) navTitle = tTransactions('transactionDetails');
    else if (pathname === '/proposals') navTitle = tProposals('proposals');
    else if (pathname.startsWith('/proposals/')) navTitle = tProposals('proposalDetails');
    else if (pathname === '/validators') navTitle = tValidators('validators');
    else if (pathname.startsWith('/validators/')) navTitle = tValidators('validatorDetails');
    else if (pathname.startsWith('/accounts/')) navTitle = tAccounts('accountDetails');
    else if (pathname === '/params') navTitle = tParams('params');
    else if (/^\/[^/]+$/.test(pathname)) navTitle = tProfiles('profileDetails');

    return (
        <Layout navTitle={navTitle}>
            <Outlet />
        </Layout>
    );
}

function RoutedLayout() {
    return <RoutedComponent Component={AppLayoutRoute} />;
}

const Router = () => {
    return (
        <Routes>
            <Route path="/account/:address" element={<LegacyAccountRedirect />} />
            <Route path="/validator/:address" element={<LegacyValidatorRedirect />} />
            <Route path="/transaction/:tx" element={<LegacyTransactionRedirect />} />

            <Route element={<RoutedLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/blocks" element={<Blocks />} />
                <Route path="/blocks/:height" element={<BlockDetails />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/transactions/:tx" element={<TransactionDetails />} />
                <Route path="/proposals" element={<Proposals />} />
                <Route path="/proposals/:id" element={<ProposalDetails />} />
                <Route path="/validators" element={<Validators />} />
                <Route path="/validators/:address" element={<ValidatorDetails />} />
                <Route path="/accounts/:address" element={<AccountDetails />} />
                <Route path="/params" element={<Params />} />
                <Route path="/:dtag" element={<ProfileDetails />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default Router;
