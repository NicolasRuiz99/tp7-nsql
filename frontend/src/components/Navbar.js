import React from 'react';
import {withRouter,Link} from 'react-router-dom';

const Navbar = ({setSearch}) => {

	return (
        <div className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">SPA Superheroes/Películas</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="dropdown">
              <button className="btn btn-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Home
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" type="button" to="/hero">Superheroes</Link>
                <Link className="dropdown-item" type="button" to="/">Películas</Link>
              </div>
            </li>
            <li className="dropdown">
              <Link className="btn btn-primary" type="button" aria-haspopup="true" aria-expanded="false" to="/hero/marvel">
                Marvel
              </Link>
              </li>
            <li className="dropdown">
            <Link className="btn btn-primary" type="button" aria-haspopup="true" aria-expanded="false" to="/hero/dc">
                DC
              </Link>
            </li>
            <li className="dropdown">
              <button className="btn btn-primary" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Insertar
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                <Link className="dropdown-item" type="button" to="/heroadd">Superheroes</Link>
                <Link className="dropdown-item" type="button" to="/movieadd">Peliculas</Link>
              </div>
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