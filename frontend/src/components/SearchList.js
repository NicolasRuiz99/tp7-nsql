import React from "react";
import SearchItem from "./SearchItem";

const SearchList = ({list,add}) => {
    return (
        <div>
            {list.map(item => (
                        <SearchItem 
                            key = {item.id}
                            item = {item}
                            add = {add}
                        />
            ))}
        </div>
    );
};

export default SearchList;