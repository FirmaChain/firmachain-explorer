import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgVoteAnte050 } from '@models';
import VoteAnte050 from '.';

// ==================================
// mocks
// ==================================
jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgVoteAnte050', () => {
  it('matches snapshot', () => {
    const message = new MsgVoteAnte050({
      category: 'governance',
      type: 'MsgVote',
      proposalId: 10,
      voter: 'voter',
      option: 'VOTE_OPTION_NO',
    });
    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <VoteAnte050
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
