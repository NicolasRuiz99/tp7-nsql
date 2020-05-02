import React from "react";
import {withRouter,Link} from 'react-router-dom';

const CastItem = ({item}) => {
    return (
        <tr className="table-active">
                <td><img src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} className="img-thumbnail" width="90" height="180" alt="NO IMAGE" /></td>
                <td>{item.name}</td>
                <td>{item.character}</td>
                {(item.id_hero)?
                <td><Link type="button" className="btn btn-primary" to={`/hero/${item.id_hero}`}>Detalles</Link></td>
                :
                <td></td>
                }               
        </tr>
    );
};

export default withRouter (CastItem);