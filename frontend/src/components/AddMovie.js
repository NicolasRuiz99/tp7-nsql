import React,{useState,Fragment} from "react";
import {withRouter} from 'react-router-dom';
import {searchAPImovie,alertConfirm,alertError,alertSuccess,getAPImovieCast, movieaddItem} from '../functions';
import Loading from "./Loading";
import SearchList from "./SearchList";

const AddMovie = ({history}) => {

    const [query,setQuery] = useState ("");
    const [list,setList] = useState ([]);
    const [found,setFound] = useState (true);
    const [loading,setLoading] = useState (false);

    const search = (e) => {
        e.preventDefault()
        setLoading (true);
        searchAPImovie (query)
        .then (res=>{
            if (res.total_results == 0){
                setFound (false);
                setLoading (false);
                return;
            }else{
                setFound (true);
            }
            if (res.results.length > 10){
                setList (res.results.slice(0,10));
            }else{
                setList (res.results);
            }
            setLoading (false);
        })
        .catch (err=>{
            alertError();
            setLoading (false);
            return;
        })
    }

    const add = (item) => {
        alertConfirm ()
        .then(res=>{
            if (res.value){
                getAPImovieCast (item.id)
                .then (res=>{
                    const item = {
                        id:item.id,
                        title:item.title,
                        release_date:item.release_date,
                        overview:item.overview,
                        poster_path:item.poster_path,
                        cast:res.cast
                    }
            
                    movieaddItem(item)
                    .then (res=>{
                        alertSuccess()
                        .then (()=>{
                            history.push('/movie');
                        });
                    })
                    .catch (err=>{
                        alertError();
                        return;
                    })
                })
                .catch (err=>{
                    alertError();
                    return;
                })
            }else{
                return;
            }
        })
    }

    return (
        <Fragment>
            <div className="jumbotron">
                <h1 className="display-3">Cargar película</h1>
                <p className="lead">Ingrese un nombre de una película para obtener su itemrmación y cargarla a la base de datos.</p>
                <hr className="my-4"/>
                <p class="text-info">Se mostrarán los primeros 10 resultados.</p>
                <form className="form-inline my-2 my-lg-0" onSubmit={search}>
                    <input className="form-control mr-sm-2" type="text" placeholder="Nombre" onChange={e=>setQuery(e.target.value)}/>
                    <button className="btn btn-primary my-2 my-sm-0" type="submit">Buscar</button>
                </form>
                {(!found)? <p class="text-danger">No se encontraron resultados!</p>: null}
            </div>
            {(list.length !== 0)?
            <div>
                {(loading)?
                <Loading/>
                :
                <SearchList list={list} add={add} />
                }
            </div>
            :
            null
            }
        </Fragment>
    );
};

export default withRouter (AddMovie);