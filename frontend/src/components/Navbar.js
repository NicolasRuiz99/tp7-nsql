import React from 'react';
import {withRouter,Link} from 'react-router-dom';

const Navbar = ({setSearch}) => {

	return (
        <div className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">SPA Superheroes</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" type="button" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" type="button" to="/marvel">Marvel</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" type="button" to="/dc">DC</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" type="button" to="/add">Insertar</Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Nombre" onChange={(e)=>setSearch(e.target.value)} ></input>
          </form>
        </div>
      </div>
	);
}

export default withRouter (Navbar);