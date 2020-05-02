import React from 'react';
import {withRouter,Link} from 'react-router-dom';

const ListItem = ({item}) => {

    if (item.overview){
        return (
            <div className="col mb-4">
                <div className="card">
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} height="430" width="160" className="card-img-top" alt="NO IMAGE"></img>
                <div className="card-header">
                    <h5 className="card-title">{item.title}</h5>
                    <h6 className="card-subtitle text-muted">Fecha: {item.release_date}</h6>
                </div>
                <div className="card-body">
                    <p className="card-text">{item.overview.slice(0,50)}...</p>
                    <Link type="button" className="btn btn-light" to={`/movie/${item.id}`} >Ver detalles</Link>
                </div>
                </div>
            </div>
        );
    }else{
        return (
            <div className="col mb-4">
                <div className="card">
                <img src={`http://localhost:5000/image/${item.images[0]}`} height="430" width="160" className="card-img-top" alt="NO IMAGE"></img>
                <div className="card-header">
                    <h5 className="card-title">{item.name}</h5>
                    <h6 className="card-subtitle text-muted">{(item.character !== "")? item.character:""}</h6>
                </div>
                <div className="card-body">
                    <p className="card-text">{item.biography.slice(0,150)}...</p>
                    <Link type="button" className="btn btn-light" to={`/hero/${item.id}`} >Ver detalles</Link>
                </div>
                </div>
            </div>
        );
    }
	
}

export default withRouter (ListItem);