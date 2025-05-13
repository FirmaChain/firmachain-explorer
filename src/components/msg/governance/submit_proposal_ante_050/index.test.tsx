import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgSubmitProposalAnte050 } from '@models';
import SubmitProposalAnte050 from '.';

// ==================================
// mocks
// ==================================
jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/SubmitProposalAnte050', () => {
  it('matches snapshot', () => {
    const message = new MsgSubmitProposalAnte050({
      category: 'governance',
      type: 'MsgSubmitProposalAnte050',
      content: 'content',
      proposer: 'proposer',
      initialDeposit: [
        {
          denom: 'udaric',
          amount: '2000000',
        },
      ],
    });
    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <SubmitProposalAnte050
            message={message}
          />
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
