import React,{useEffect,useState} from 'react';
import List from './List';
import Error from './Error';
import Loading from './Loading';
import {herolistAll,herolistMarvel,herolistDC} from '../functions';

const Home = ({type,search}) => {

    const [list,setList] = useState ([]);
    const [filterList,setFilterList] = useState ([]);
    const [error,setError] = useState (false);
    const [empty,setEmpty] = useState (false);
    const [refresh,setRefresh] = useState (false);
    const [loading,setLoading] = useState (false);

    useEffect (()=>{
        if (search === ""){
            setFilterList (list);
        }else{
            setFilterList (list.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase())))
        }
    },[search])

    useEffect (()=>{
        setRefresh (false);
        setError (false);
        setEmpty (false);
        setLoading (true);
        switch (type){
            case 1:
                herolistAll()
                .then ((res)=>{
                    if (res === null){
                        setEmpty (true);
                        return;
                    }else{
                        setList(res);
                        setFilterList (res);
                        setLoading (false);
                    }
                })
                .catch((err)=>{
                    setLoading (false);
                    setError (true);
                    return;
                })
            break;
            case 2:
                herolistMarvel()
                .then ((res)=>{
                    if (res === null){
                        setEmpty (true);
                        return;
                    }else{
                        setList(res);
                        setFilterList (res);
                        setLoading (false);
                    }
                })
                .catch((err)=>{
                    setLoading (false);
                    setError (true);
                    return;
                })
            break;
            case 3:
                herolistDC()
                .then ((res)=>{
                    if (res === null){
                        setEmpty (true);
                        return;
                    }else{
                        setList(res);
                        setFilterList (res);
                        setLoading (false);
                    }
                })
                .catch((err)=>{
                    setLoading (false);
                    setError (true);
                    return;
                })
            break;
        }
        
    },[refresh,type])

	return (
        <div>
            {(loading)?
            <Loading />
            :
            <div>
                {(error)? <Error mensaje={"Ocurrió un error en el servidor"} /> : null}
                {(empty)? <Error mensaje={"No hay datos para mostrar"} /> : null}
                <List list={filterList} />
            </div>
            }
        </div>
	);
}

export default Home;