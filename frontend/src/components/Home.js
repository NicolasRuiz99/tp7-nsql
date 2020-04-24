import React,{useEffect,useState} from 'react';
import List from './List';
import Error from './Error';
import Loading from './Loading';
import {listAll,deleteItem,listMarvel,listDC} from '../functions';

const Home = ({type,search}) => {

    const [list,setList] = useState ([]);
    const [filterList,setFilterList] = useState ([]);
    const [error,setError] = useState (false);
    const [empty,setEmpty] = useState (false);
    const [refresh,setRefresh] = useState (false);
    const [loading,setLoading] = useState (false);

    const deleteCoin = (rank) => {
        setError (false);
        deleteItem(rank)
        .then(()=>{
            setRefresh(true);
        })
        .catch((err)=>{
            setError (true);
            return;
        })
    }

    useEffect (()=>{
        if (search === ""){
            setFilterList (list);
        }else{
            console.log('entro');
            
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
                listAll()
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
                listMarvel()
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
                listDC()
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