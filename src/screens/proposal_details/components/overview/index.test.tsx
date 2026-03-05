import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import Overview from '.';

// ==================================
// mocks
// ==================================
jest.mock('@components', () => ({
  SingleProposal: (props) => <div id="SingleProposal" {...props} />,
  Name: (props) => <div id="Name" {...props} />,
  Box: (props) => <div id="Box" {...props} />,
  Markdown: (props) => <div id="Markdown" {...props} />,
  Tag: (props) => <span id="Tag" {...props} />,
}));

jest.mock('./components', () => ({
  ParamsChange: (props) => <div id="ParamsChange" {...props} />,
  SoftwareUpgrade: (props) => <div id="SoftwareUpgrade" {...props} />,
  CommunityPoolSpend: (props) => <div id="CommunityPoolSpend" {...props} />,
}));

jest.mock('./components/params_change_v5', () => ({
  __esModule: true,
  default: (props) => <div id="ParamsChangeV5" {...props} />,
}));

// ==================================
// unit tests
// ==================================
describe('screen: BlockDetails/Overview', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <Overview
            overview={{
              content : [{
                '@type': '/cosmos.distribution.v1beta1.MsgCommunityPoolSpend',
                authority: 'authority',
                recipient: 'recipient',
                amount: [{
                  denom: 'denom',
                  amount: '1000000',
                }]
              }],
              metadata: 'metadata',
              proposer: '',
              title: 'title',
              id: 10,
              description: 'description',
              status: 'status',
              submitTime: 'submitTime',
              depositEndTime: 'depositEndTime',
              votingEndTime: null,
              votingStartTime: null,
            }}
          />
        </MockTheme>
      </RecoilRoot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders 5 messages (Multiple type) with all sections', () => {
    const overviewWithFiveMessages = {
      content: [
        {
          '@type': '/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade',
          authority: 'firma10d07y265gmmuvt4z0w9aw880jnsr700j53mj8f',
          plan: {
            info: 'Upgrade to v0.5.1999',
            name: 'v0.5.1999',
            time: '1970-01-01T00:00:00Z',
            height: '5648500',
            upgraded_client_state: null,
          },
        },
        {
          '@type': '/cosmos.distribution.v1beta1.MsgCommunityPoolSpend',
          authority: 'firma10d07y265gmmuvt4z0w9aw880jnsr700j53mj8f',
          recipient: 'address1',
          amount: [{ denom: 'ufct', amount: '15000000000' }],
        },
        {
          '@type': '/cosmos.distribution.v1beta1.MsgCommunityPoolSpend',
          authority: 'firma10d07y265gmmuvt4z0w9aw880jnsr700j53mj8f',
          recipient: 'address2',
          amount: [{ denom: 'ufct', amount: '25000000000' }],
        },
        {
          '@type': '/cosmos.gov.v1.MsgUpdateParams',
          authority: 'firma10d07y265gmmuvt4z0w9aw880jnsr700j53mj8f',
          params: {
            quorum: '0.334',
            threshold: '0.5',
            min_deposit: [{ denom: 'ufct', amount: '5000000000' }],
            voting_period: '300s',
          },
        },
        {
          '@type': '/cosmos.distribution.v1beta1.MsgCommunityPoolSpend',
          authority: 'firma10d07y265gmmuvt4z0w9aw880jnsr700j53mj8f',
          recipient: 'address3',
          amount: [{ denom: 'ufct', amount: '10000000000' }],
        },
      ],
      metadata: '',
      proposer: 'firma1proposer123',
      title: 'Proposal with 5 messages',
      id: 42,
      description: 'Sample description for multi-message proposal.',
      status: 'PROPOSAL_STATUS_VOTING_PERIOD',
      submitTime: '2025-01-15T10:00:00Z',
      depositEndTime: '2025-01-16T10:00:00Z',
      votingEndTime: '2025-01-20T10:00:00Z',
      votingStartTime: '2025-01-17T10:00:00Z',
    };

    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <Overview overview={overviewWithFiveMessages} />
        </MockTheme>
      </RecoilRoot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
