import React from 'react';

export default props => {
  const { handleClick } = props;
  const { title, badgeIcon, github, text, image } = props.item;

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
