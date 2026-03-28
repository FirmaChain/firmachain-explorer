/* eslint-disable */
import React from 'react';
import { Trans as ReactI18nextTrans } from 'react-i18next';

type Props = {
  i18nKey: string;
  components?: React.ReactNode[];
  values?: Record<string, any>;
};

const Trans = ({ i18nKey, components, values }: Props) => {
  if (i18nKey.includes(':')) {
    const [ns, key] = i18nKey.split(':');
    return <ReactI18nextTrans i18nKey={key} ns={ns} components={components as any} values={values} />;
  }

  return <ReactI18nextTrans i18nKey={i18nKey} components={components as any} values={values} />;
};

export default Trans;
