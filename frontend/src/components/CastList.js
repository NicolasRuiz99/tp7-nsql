import React from "react"
import CastItem from "./CastItem";

const CastList = ({list}) => {
    return (
        <font size="4" >
        <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">Imagen</th>
                <th scope="col">Actor</th>
                <th scope="col">Personaje</th>
                <th scope="col">Info</th>
                </tr>
            </thead>
            <tbody>
            {list.map(item => (
                        <CastItem
                            key = {item.id}
                            item = {item}
                        />
            ))}
            </tbody>
        </table> 
        </font>
    );
};

export default CastList;