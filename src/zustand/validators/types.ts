export type AtomState = {
    delegator: string;
    validator: string;
} | null;

export type ValidatorRecord = Exclude<AtomState, null>;

export type ValidatorsStoreState = {
    validators: Record<string, AtomState | undefined>;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    setValidator: (consensusAddress: string, validator: AtomState) => void;
    setValidators: (entries: Array<{ consensusAddress: string; validator: ValidatorRecord }>) => void;
    reset: () => void;
};
