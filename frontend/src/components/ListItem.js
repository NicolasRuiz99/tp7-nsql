import React from 'react';
import {withRouter,Link} from 'react-router-dom';

const ListItem = ({item}) => {

	return (
        <div className="col mb-4">
            <div className="card">
            <img src={require (`../images/${item.images[0]}`)} height="430" width="160" className="card-img-top"></img>
            <div className="card-header">
                <h5 className="card-title">{item.name}</h5>
                <h6 className="card-subtitle text-muted">{(item.character !== "")? item.character:""}</h6>
            </div>
            <div className="card-body">
                <p className="card-text">{item.biography.slice(0,150)}...</p>
                <button type="button" class="btn btn-light">Ver detalles</button>
            </div>
            </div>
        </div>
	);
}

export default withRouter (ListItem);