import React from "react";
import {withRouter,Link} from 'react-router-dom';

const HeroMovieItem = ({item}) => {
    return (
        <tr className="table-active">
                <td>{item.title}</td>
                <td><Link type="button" className="btn btn-primary" to={`/movie/${item.id}`}>Detalles</Link></td>      
        </tr>
    );
};

export default withRouter (HeroMovieItem);