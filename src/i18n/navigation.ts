import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import {
  redirect as nextRedirect,
  type RedirectType,
} from 'next/navigation';
import * as React from 'react';
import type { UrlObject } from 'url';
import type { Locale } from './config';

type Href = string | UrlObject;
type LocalizedHref = Href | { href: Href; locale?: Locale };

type LinkProps = Omit<React.ComponentProps<typeof NextLink>, 'href'> &
  NextLinkProps & {
    href: Href;
    locale?: Locale;
  };

export function Link(props: LinkProps) {
  const { href, ...rest } = props;
  const nextProps = { href, ...rest } as Record<string, unknown>;
  delete nextProps.locale;

  return React.createElement(NextLink, nextProps as React.ComponentProps<typeof NextLink>);
}

export function redirect(input: LocalizedHref, type?: RedirectType) {
  const href = typeof input === 'object' && 'href' in input ? input.href : input;
  nextRedirect(href, type);
}
