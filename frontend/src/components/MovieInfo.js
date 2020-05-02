import React,{useState,useEffect,Fragment} from "react";
import { movieget, alertError } from "../functions";
import Loading from "./Loading";
import CastList from "./CastList";

const MovieInfo = ({id}) => {

    const [info,setInfo] = useState ({});
    const [loading,setLoading] = useState (false);

    useEffect (()=>{
        setLoading (true);
        movieget (parseInt(id))
        .then (res=>{
            setInfo (res);
            setLoading (false);
        })
        .catch (err=>{
            alertError ();
            return;
        })
    },[id])

    return (
        <Fragment>
            {(loading)?
                <Loading/>
            :
            <div className="jumbotron">
                        <div className="row row-cols-1 row-cols-md-2">
                            <div className="col mb-4 order-md-2 mb-4">
                                <img src={`https://image.tmdb.org/t/p/w500${info.poster_path}`} className="rounded" alt="NO IMAGE"></img>
                            </div>
                            <div className="col mb-4 order-md-1 mb-4">
                                <h1 className="display-5">{info.title}</h1>
                                <p className="lead">{info.overview}</p>
                                <hr className="my-4"/>
                                <p>Fecha de lanzamiento: {info.release_date}</p>
                                <h3 className="display-6">Casting</h3>
                                {(info.cast)?
                                <CastList list={info.cast}/>
                                :
                                null
                                }
                            </div>
                        </div>
            </div>
            }
        </Fragment>
    );
};

export default MovieInfo;