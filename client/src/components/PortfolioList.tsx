import React from 'react';
import PortfolioItem, { Item } from './PortfolioItem';

type PortfolioListProps = {
  handleClick: React.FormEventHandler;
  year: string;
  list: Item[];
  sideBarName: string;
};

const PortfolioList = ({
  handleClick,
  year,
  list,
  sideBarName,
}: PortfolioListProps) => {
  const klass = `col-sm-2 col-md-1 ${sideBarName}`;

  return (
    <div className='row' data-testid={`${year}-list`}>
      <div className={klass}>
        <p>{year}</p>
      </div>

      <div className='col-sm-10 col-md-11 portfolio-items'>
        {list.map((item: Item, index: number) => (
          <PortfolioItem
            key={`portfolio-item-${index}`}
            item={item}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioList;
