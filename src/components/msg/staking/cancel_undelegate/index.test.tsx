import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgCancelUndelegate } from '@models';
import CancelUndelegate from '.';

// ==================================
// mocks
// ==================================
jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/CancelUndelegate', () => {
  it('matches snapshot', () => {
    const message = new MsgCancelUndelegate({
      category: 'staking',
      type: 'MsgEditValidator',
      delegatorAddress: 'delegatorAddress',
      validatorAddress: 'validatorAddress',
      amount: {
        denom: 'udaric',
        amount: '1000000000',
      },
    });
    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <CancelUndelegate
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
