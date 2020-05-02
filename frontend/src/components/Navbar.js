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
                <Link className="dropdown-item" to="/">Superheroes</Link>
                <a className="dropdown-item" href="#">Peliculas</a>
              </div>
            </li>
            <li className="dropdown">
              <button className="btn btn-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Marvel
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" to="/hero/marvel">Superheroes</Link>
                <a className="dropdown-item" href="#">Peliculas</a>
              </div>
            </li>
            <li className="dropdown">
              <button className="btn btn-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                DC
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" to="/hero/dc">Superheroes</Link>
                <a className="dropdown-item" href="#">Peliculas</a>
              </div>
            </li>
            <li className="dropdown">
              <button className="btn btn-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Insertar
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" to="/heroadd">Superheroes</Link>
                <Link className="dropdown-item" to="/movieadd">Peliculas</Link>
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