# Recoil -> Zustand migration notes

## What changed

- Every Recoil module now exposes a Zustand store hook (`useXStore`) plus selector functions.
- The old initialization/query hooks are still exported with the same names (`useSettingsRecoil`, `useMarketRecoil`, `useProfileRecoil`, etc.), but they no longer depend on Recoil.
- `profiles` keeps a subscription bridge to `validators` so consensus-address derived selectors still react when validator mappings load.

## Store mapping

- `@zustand/settings` -> `useSettingsStore`
- `@zustand/market` -> `useMarketStore`
- `@zustand/big_dipper_networks` -> `useBigDipperNetworksStore`
- `@zustand/validators` -> `useValidatorsStore`
- `@zustand/profiles` -> `useProfilesStore`

## Selector migration pattern

### Read selectors

Before:

```ts
const theme = useSettingsStore(readTheme);
const market = useMarketStore(readMarket);
const profile = useRecoilValue(readProfile(address));
```

After:

```ts
const theme = useSettingsStore(readTheme);
const market = useMarketStore(readMarket);
const profile = useProfilesStore(readProfile(address));
```

### Write selectors

Before:

```ts
const [theme, setTheme] = useRecoilState(writeTheme);
const [market, setMarket] = useRecoilState(writeMarket);
const [validator, setValidator] = useRecoilState(writeValidator(address));
```

After:

```ts
const theme = useSettingsStore(readTheme);
const setTheme = useSettingsStore(writeTheme);

const market = useMarketStore(readMarket);
const setMarket = useMarketStore(writeMarket);

const validator = useValidatorsStore(readValidator(address));
const setValidator = writeValidator(address);
```

For profile families, use the same pattern:

```ts
const profile = useProfilesStore(readProfile(address));
const setProfile = writeProfile(address);
```

### Atom migration

If you used raw atoms/atom families directly, use the selector alias from `atom.ts` with the matching store hook.

Before:

```ts
const settings = useRecoilValue(atomState);
const validator = useRecoilValue(atomFamilyState(address));
```

After:

```ts
const settings = useSettingsStore(atomState);
const validator = useValidatorsStore(atomFamilyState(address));
```

## App bootstrap

- Remove `RecoilRoot`.
- Install Zustand if it is not already present:

```bash
pnpm add zustand
```

## Important note about profiles

`profiles` depends on validator consensus-address resolution. That dependency is now handled by a small bridge inside `profiles/store.ts`, so `useProfilesStore(readProfile(address))` still updates when validator mappings arrive.
