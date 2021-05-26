import React from 'react';
import { Link } from './MyLink';

type PortfolioItemProps = {
  handleClick: React.FormEventHandler;
  item: Item;
};

export type Item = {
  title: string;
  badgeIcon?: JSX.Element | undefined;
  github?: Link | string | Element | JSX.Element;
  text?: () => JSX.Element[] | JSX.Element;
  image?: (handleClick: React.MouseEventHandler) => Element | JSX.Element;
};

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  handleClick,
  item,
}: PortfolioItemProps) => {
  const { title, badgeIcon, github, text, image } = item;

  return (
    <div className='portfolio-item'>
      <div className='portfolio-item-head'>
        <h3>
          <strong>{title}</strong>
        </h3>
        {github ? github : null}
      </div>

      {badgeIcon ? badgeIcon : null}
      {text ? text() : null}
      {image ? image(handleClick) : null}
    </div>
  );
};

export default PortfolioItem;
