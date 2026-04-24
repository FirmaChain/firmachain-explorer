import { useScreenSize } from '@hooks';

import Desktop from './components/desktop';
import Mobile from './components/mobile';

const Nav = ({ title }: { title?: string }) => {
    const { isDesktop } = useScreenSize();

    return isDesktop ? <Desktop title={title} /> : <Mobile title={title} />;
};

export default Nav;
