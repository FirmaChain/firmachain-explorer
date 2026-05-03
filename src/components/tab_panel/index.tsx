import { ReactNode } from 'react';
import clsx from 'clsx';

const TabPanel = (props: { children?: ReactNode; index: any; value: any; className?: string }) => {
    const { children, value, index, className } = props;
    return (
        <div className={clsx(className)} role="tabpanel" hidden={value !== index}>
            {value === index && <>{children}</>}
        </div>
    );
};

export default TabPanel;
