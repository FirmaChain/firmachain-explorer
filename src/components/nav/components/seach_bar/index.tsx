import { chainConfig } from '@/configs';
import { Search } from '@components';
import { useTranslation } from 'react-i18next';

import { useSearchBar } from './hooks';

const SearchBar = ({ className }: { className?: string }) => {
    const { t } = useTranslation('common');
    const { handleOnSubmit } = useSearchBar();

    let placeholderText;
    if (chainConfig.extra.profile) {
        placeholderText = t('searchBarPlaceholderDtag');
    } else {
        placeholderText = t('searchBarPlaceholder');
    }

    return <Search className={className} placeholder={placeholderText} callback={handleOnSubmit} />;
};

export default SearchBar;
