/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';

type LinkHref =
    | string
    | {
          pathname?: string;
          query?: Record<string, any>;
      };

type LinkProps = {
    href: LinkHref;
    children: React.ReactNode;
    passHref?: boolean;
    locale?: string;
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

const toHref = (href: LinkHref) => {
    if (typeof href === 'string') return href;
    return buildPath(href.pathname || '/', href.query);
};

const Link = ({ href, children, passHref }: LinkProps) => {
    const navigate = useNavigate();
    const to = toHref(href);

    const onClick = (e: React.MouseEvent, childOnClick?: (event: React.MouseEvent) => void) => {
        if (childOnClick) {
            childOnClick(e);
        }
        if (e.defaultPrevented) return;
        if (isExternal(to)) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to);
    };

    if (React.isValidElement(children)) {
        const childProps = (children as any).props || {};
        return React.cloneElement(children as React.ReactElement, {
            href: passHref ? to : childProps.href,
            onClick: (e: React.MouseEvent) => onClick(e, childProps.onClick)
        });
    }

    return (
        <a href={to} onClick={(e) => onClick(e)}>
            {children}
        </a>
    );
};

export default Link;
