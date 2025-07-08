import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgCancelProposal } from '@models';
import CancelProposal from '.';

// ==================================
// mocks
// ==================================

jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/CancelProposal', () => {
  it('matches snapshot', () => {
    const message = new MsgCancelProposal({
      category: 'governance',
      type: 'MsgCancelProposal',
      proposalId: 10,
      proposer: 'proposer',
    });
    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <CancelProposal
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
