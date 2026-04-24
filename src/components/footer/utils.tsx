const BIG_DIPPER_URL = 'https://bigdipper.live';

const FIRMACHAIN_URL = 'https://firmachain.org';
const STATION_URL = 'https://explorer.firmachain.dev';
const MEDIUM_URL = 'https://medium.com/firmachain';
const CONTACT_URL = 'mailto:contact@firmachain.org';

export const footerLinks = [
    {
        key: 'company',
        links: [
            {
                key: 'firmachain',
                url: FIRMACHAIN_URL
            },
            {
                key: 'station',
                url: STATION_URL
            },
            {
                key: 'contact',
                url: CONTACT_URL
            },
            {
                key: 'medium',
                url: MEDIUM_URL
            }
        ]
    },
    {
        key: 'bigDipper',
        links: [
            {
                key: 'about',
                url: `${BIG_DIPPER_URL}/#about`
            },
            {
                key: 'faq',
                url: `${BIG_DIPPER_URL}/faq`
            },
            {
                key: 'termsAndConditions',
                url: `${BIG_DIPPER_URL}/terms-and-conditions`
            },
            {
                key: 'privacyPolicy',
                url: `${BIG_DIPPER_URL}/privacy-policy`
            }
        ]
    }
];
