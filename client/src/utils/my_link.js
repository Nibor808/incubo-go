import React from 'react';

export const MyLink = ({ title, href }) => {
  return (
    <a href={href} target={'_blank'} rel='noopener noreferrer'>
      {title}
    </a>
  );
};
