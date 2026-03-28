import React, { Suspense } from 'react';

type DynamicOptions = {
    loading?: React.ComponentType<any>;
};

const dynamic = (importer: () => Promise<any>, options?: DynamicOptions) => {
    const LazyComponent = React.lazy(async () => {
        const mod = await importer();
        return { default: mod.default || mod };
    });

    const Fallback = options?.loading;

    const Wrapped = (props: any) => (
        <Suspense fallback={Fallback ? <Fallback /> : null}>
            <LazyComponent {...props} />
        </Suspense>
    );

    return Wrapped;
};

export default dynamic;
