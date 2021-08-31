import * as R from 'ramda';
import { chainConfig } from '@configs';
import { useSettingsContext } from '@contexts';
import { Typography } from "@material-ui/core";

const getFirmaTitle = (type) => {
  const { theme } = useSettingsContext();
  const logoUrl = R.pathOr(chainConfig.logo.default, ['logo', theme], chainConfig);
  const titleSize = type === 'title'? '56px':'80px';
  const fontSize = type === 'title'? '2rem':'3rem';

  return (
    <div
        style={{
        height: `${titleSize}`,
        display: 'flex',
        justifyContent: 'center',
        }}
    >
        <img src={logoUrl} alt="logo" />
        <Typography
        variant="h1"
        style={{
            color: 'white',
            lineHeight: `${titleSize}`,
            paddingLeft: '10px',
            fontSize: `${fontSize}`,
        }}
        >
        {chainConfig.chain}
        </Typography>
    </div>
  );
};

export default getFirmaTitle;