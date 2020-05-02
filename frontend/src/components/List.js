import React from 'react';
import ListItem from './ListItem';

const List = ({list}) => {
	return (
        <div>
            <div className="row row-cols-1 row-cols-md-6">
            {list.map(item => (
                        <ListItem 
                            key = {item._id}
                            item = {item}
                        />
            ))}
            </div>
      </div>
	);
}

export default List;