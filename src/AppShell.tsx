import React from 'react';
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
import { Navigate, Route, Routes, useParams } from 'react-router';

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

const AppShell = () => {
    return (
        <Routes>
            <Route path="/" element={<RoutedComponent Component={Home} />} />
            <Route path="/blocks" element={<RoutedComponent Component={Blocks} />} />
            <Route path="/blocks/:height" element={<RoutedComponent Component={BlockDetails} />} />
            <Route path="/transactions" element={<RoutedComponent Component={Transactions} />} />
            <Route path="/transactions/:tx" element={<RoutedComponent Component={TransactionDetails} />} />
            <Route path="/proposals" element={<RoutedComponent Component={Proposals} />} />
            <Route path="/proposals/:id" element={<RoutedComponent Component={ProposalDetails} />} />
            <Route path="/validators" element={<RoutedComponent Component={Validators} />} />
            <Route path="/validators/:address" element={<RoutedComponent Component={ValidatorDetails} />} />
            <Route path="/accounts/:address" element={<RoutedComponent Component={AccountDetails} />} />
            <Route path="/params" element={<RoutedComponent Component={Params} />} />

            <Route path="/account/:address" element={<LegacyAccountRedirect />} />
            <Route path="/validator/:address" element={<LegacyValidatorRedirect />} />
            <Route path="/transaction/:tx" element={<LegacyTransactionRedirect />} />

            <Route path="/:dtag" element={<RoutedComponent Component={ProfileDetails} />} />
            <Route path="*" element={<RoutedComponent Component={NotFound} />} />
        </Routes>
    );
};

export default AppShell;
