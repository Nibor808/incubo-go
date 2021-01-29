import React from 'react';

export const MyLink = props => {
  const { title, href, klass } = props;

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
