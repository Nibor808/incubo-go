import React from 'react';

const PortfolioItem = ({ handleClick, item }) => {
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
