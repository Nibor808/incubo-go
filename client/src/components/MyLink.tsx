import React from 'react';

export type Link = {
  title: string | JSX.Element;
  href: string;
  klass?: string;
};

export const MyLink: React.FC<Link> = ({ title, href, klass }: Link) => {
  return (
    <a
      href={href}
      target={'_blank'}
      rel='noopener noreferrer'
      className={klass}
    >
      {title}
    </a>
  );
};
