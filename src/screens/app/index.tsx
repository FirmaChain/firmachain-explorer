import React from "react";
import { RecoilRoot } from "recoil";
import { AppProps } from "@/adapters/app/types";
import { DefaultSeo } from "@/adapters/seo/seo";
import useTranslation from "@/adapters/i18n/useTranslation";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/graphql/client";
import { chainConfig } from "@configs";
import { useWindowOrigin } from "@hooks";
import { Main } from "./components";
import { useApp } from "./hooks";
import {
  OPEN_GRAPH_SEO,
  TWITTER_SEO,
  ADDITIONAL_LINK_TAGS_SEO,
  ADDITIONAL_META_TAGS,
} from "./utils";

function App(props: AppProps) {
  useApp();
  const { pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);
  const { t } = useTranslation();
  const { location } = useWindowOrigin();

  return (
    <>
      <DefaultSeo
        titleTemplate={`%s | ${chainConfig.title}`}
        title={t("common:chainName")}
        description={t("common:description")}
        openGraph={{
          title: `${t("common:chainName")} | ${chainConfig.title}`,
          url: location,
          description: t("common:description"),
          ...OPEN_GRAPH_SEO,
        }}
        twitter={TWITTER_SEO}
        additionalLinkTags={ADDITIONAL_LINK_TAGS_SEO}
        additionalMetaTags={ADDITIONAL_META_TAGS}
      />
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <Main {...props} />
        </RecoilRoot>
      </ApolloProvider>
    </>
  );
}

export default App;
