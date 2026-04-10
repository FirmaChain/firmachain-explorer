import { selectMarketState } from './selectors';
import { initialState } from './store';

export { initialState };

export const atomState = selectMarketState;
