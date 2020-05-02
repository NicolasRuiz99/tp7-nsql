import React,{useEffect,useState} from "react";
import { movieget } from "../functions";

const SearchItem = ({item,add}) => {

    const [inDB,setInDB] = useState (false);

    useEffect (()=>{
        movieget (item.id)
        .then ((res)=>{
            if (res !== null){
                setInDB (true);
            }
        })
    },[item])

    return (
        <div className="jumbotron">
                    <div className="row row-cols-1 row-cols-md-2">
                        <div className="col mb-4 order-md-2 mb-4">
                            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="rounded" alt="NO IMAGE"></img>
                        </div>
                        <div className="col mb-4 order-md-1 mb-4">
                            <h1 className="display-5">{item.title}</h1>
                            <p className="lead">{item.overview}</p>
                            <hr className="my-4"/>
                            <p>Fecha de lanzamiento: {item.release_date}</p>
                            <p className="lead">
                                {(inDB)?
                                <a className="btn btn-info" role="button" disabled>Película ya cargada</a>
                                :
                                <a className="btn btn-success" onClick={()=> add(item)} role="button">Agregar película</a>
                                }
                                
                            </p>
                        </div>
                    </div>
        </div>
    );
};

export default SearchItem;