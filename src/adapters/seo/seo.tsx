/* eslint-disable */
import React from 'react';
import { Helmet } from 'react-helmet-async';

type SeoProps = {
  title?: string;
  description?: string;
  titleTemplate?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
  };
  additionalMetaTags?: Array<Record<string, string>>;
  additionalLinkTags?: Array<Record<string, string>>;
  twitter?: Record<string, any>;
  [key: string]: any;
};

const buildTitle = (title?: string, titleTemplate?: string) => {
  if (!title) return undefined;
  if (!titleTemplate) return title;
  return titleTemplate.replace('%s', title);
};

const Seo = (props: SeoProps) => {
  const {
    title,
    description,
    titleTemplate,
    openGraph,
    additionalMetaTags,
    additionalLinkTags,
  } = props;

  const metaTags: Array<{ name?: string; property?: string; content?: string }> = [];
  if (description) metaTags.push({ name: 'description', content: description });
  if (openGraph?.title) metaTags.push({ property: 'og:title', content: openGraph.title });
  if (openGraph?.description) metaTags.push({ property: 'og:description', content: openGraph.description });
  if (openGraph?.url) metaTags.push({ property: 'og:url', content: openGraph.url });

  return (
    <Helmet>
      {buildTitle(title, titleTemplate) ? <title>{buildTitle(title, titleTemplate)}</title> : null}
      {metaTags.map((meta, index) => <meta key={`meta-${index}`} {...meta} />)}
      {additionalMetaTags?.map((meta, index) => <meta key={`extra-meta-${index}`} {...meta} />)}
      {additionalLinkTags?.map((link, index) => <link key={`extra-link-${index}`} {...link} />)}
    </Helmet>
  );
};

export const NextSeo = (props: SeoProps) => <Seo {...props} />;
export const DefaultSeo = (props: SeoProps) => <Seo {...props} />;
