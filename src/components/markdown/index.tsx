import { Typography } from '@mui/material';
import DOMPurify from 'dompurify';
import ReactMarkdown from 'markdown-to-jsx';

const options = {
    forceBlock: true,
    overrides: {
        h1: {
            component: Typography,
            props: {
                variant: 'h1'
            }
        },
        h2: {
            component: Typography,
            props: {
                variant: 'h2'
            }
        },
        h3: {
            component: Typography,
            props: {
                variant: 'h3'
            }
        },
        h4: {
            component: Typography,
            props: {
                variant: 'h4'
            }
        },
        h5: {
            component: Typography,
            props: {
                variant: 'h5'
            }
        },
        h6: {
            component: Typography,
            props: {
                variant: 'h6'
            }
        },
        default: {
            component: Typography,
            props: {
                variant: 'h6'
                // variant: 'body1',
            }
        },
        p: {
            component: Typography,
            props: {
                variant: 'body1'
            }
        },
        span: {
            component: Typography,
            props: {
                variant: 'body1'
            }
        }
    }
};

export default function Markdown(props: { markdown: string }) {
    const clean = DOMPurify.sanitize(props.markdown.replace(/\\n\s?/g, '<br/>'));

    return <ReactMarkdown options={options}>{clean}</ReactMarkdown>;
}
