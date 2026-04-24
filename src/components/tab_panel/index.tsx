import React from 'react';
import clsx from 'clsx';

const TabPanel: React.FC<{
    children?: React.ReactNode;
    index: any;
    value: any;
    className?: string;
}> = (props) => {
    const { children, value, index, className } = props;
    return (
        <div className={clsx(className)} role="tabpanel" hidden={value !== index}>
            {value === index && <>{children}</>}
        </div>
    );
};

export default TabPanel;
