import React from "react";
import HeroMovieItem from "./HeroMovieItem";

const HeroMovieList = ({list}) => {
    return (
        <font size="3" >
        <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">Título</th>
                <th scope="col">Info</th>
                </tr>
            </thead>
            <tbody>
            {list.map(item => (
                        <HeroMovieItem
                            key = {item.id}
                            item = {item}
                        />
            ))}
            </tbody>
        </table> 
        </font>
    );
};

export default HeroMovieList;