import React from 'react';
import PortfolioItem from './PortfolioItem';

const PortfolioList = ({ handleClick, year, list, sideBarName }) => {
  const klass = `col-sm-2 col-md-1 ${sideBarName}`;

  return (
    <div className='row' data-testid={`${year}-list`}>
      <div className={klass}>
        <p>{year}</p>
      </div>

      <div className='col-sm-10 col-md-11 portfolio-items'>
        {list.map((item, index) => (
          <PortfolioItem
            key={`portfolio-item-${index}`}
            item={item}
            index={index}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioList;
