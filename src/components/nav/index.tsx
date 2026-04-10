import { useScreenSize } from '@hooks';

import { Mobile } from './components';
import Desktop from './components/desktop';

const Nav = ({ title }: { title?: string }) => {
    const { isDesktop } = useScreenSize();

    return isDesktop ? <Desktop title={title} /> : <Mobile title={title} />;
};

export default Nav;
