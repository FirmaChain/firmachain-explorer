/* eslint-disable */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import i18n from "@/i18n";

type UrlObject = {
  pathname?: string;
  query?: Record<string, any>;
};

const isExternal = (url: string) => /^https?:\/\//.test(url);

const buildPath = (pathname: string, query?: Record<string, any>) => {
  if (!query) return pathname;

  let path = pathname;
  const remaining = { ...query };

  Object.keys(query).forEach((key) => {
    const value = query[key];
    const token = `[${key}]`;
    if (path.includes(token)) {
      path = path.replace(token, encodeURIComponent(String(value)));
      delete remaining[key];
    }
  });

  const searchParams = new URLSearchParams();
  Object.entries(remaining).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      searchParams.set(k, String(v));
    }
  });

  const search = searchParams.toString();
  return search ? `${path}?${search}` : path;
};

const toHref = (url: string | UrlObject) => {
  if (typeof url === "string") return url;
  return buildPath(url.pathname || "/", url.query);
};

export const useRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const search = Object.fromEntries(
    new URLSearchParams(location.search).entries(),
  );
  const query = {
    ...search,
    ...params,
  };

  const push = (url: string | UrlObject, _as?: string, _options?: any) => {
    const href = toHref(url);
    if (isExternal(href)) {
      window.location.assign(href);
      return;
    }
    navigate(href);
  };

  const replace = (url: string | UrlObject, _as?: string, _options?: any) => {
    const href = toHref(url);
    if (isExternal(href)) {
      window.location.replace(href);
      return;
    }
    navigate(href, { replace: true });
  };

  return {
    push,
    replace,
    query,
    pathname: location.pathname,
    asPath: `${location.pathname}${location.search}`,
    locale: i18n.language,
    locales: i18n.languages?.length ? i18n.languages : ["en"],
  };
};
