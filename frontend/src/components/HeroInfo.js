import React,{useEffect,useState} from "react";
import {withRouter} from 'react-router-dom';
import { get,modItem,alertConfirm, alertSuccess, alertError, deleteItem } from "../functions";
import Loading from "./Loading";
import Error from "./Error";
import CarouselImg from "./CarouselImg";

const HeroInfo = ({id,history}) => {

    const [info,setInfo] = useState ([]);
    const [error,setError] = useState (false);
    const [loading,setLoading] = useState (false);
    const [name,setName] = useState ("");
    const [character,setCharacter] = useState ("");
    const [biography,setBiography] = useState ("");
    const [house,setHouse] = useState ("");
    const [year,setYear] = useState (0);
    const [equipment,setEquipment] = useState ("");

    useEffect (()=>{
        setLoading (true);
        get (parseInt(id))
        .then((res)=>{
            setInfo (res);
            setName (res.name);
            setCharacter (res.character);
            setBiography (res.biography);
            setHouse (res.house);
            setYear (res.year);
            if (res.equipment){
                setEquipment (res.equipment);
            }
            setLoading (false);
        })
        .catch((err)=>{
            setLoading (false);
            setError (true);
            return;
        })
    },[])

    const saveChanges = async (e) => {
        e.preventDefault()
        setError (false);
        alertConfirm ()
        .then ((res=>{
            if (res.value){
                let data = {
                        id:info.id,
                        name,
                        character,
                        biography,
                        house,
                        year,
                        images:info.images,
                        equipment
                    
                }
                modItem (data)
                .then (()=>{
                    alertSuccess ()
                })
                .catch ((err)=>{
                    alertError ()
                    return;
                })
            }else{
                return;
            }
        }))
        
    }

    const deleteHero = () => {
        alertConfirm ()
        .then (res=>{
            if (res.value){
                deleteItem (info.id)
                .then (res=>{
                    alertSuccess ()
                    .then (res=>{
                        history.push('/');
                    })
                })
                .catch (err=>{
                    alertError ();
                    return;
                })
            }else{
                return;
            }
        })
    }

    return (
        <div>
                {(loading)?
                <Loading/>
                :
                <div>
                    {(error)?
                    <Error mensaje={"Ocurrió un error"} />
                    :
                    <div className="row row-cols-1 row-cols-md-2">
                        <div class="col mb-8 order-md-1">
                            {(info.images)?
                            <div>
                            {(info.images.length == 1)?
                                <div className="text-center">
                                    <img src={require (`../images/${info.images[0]}`)} height="330" width="560" className="img-thumbnail"></img>
                                </div>
                                :
                                <div className="text-center">
                                    <CarouselImg images={info.images} />
                                </div>
                                }
                                </div>
                            :
                            null
                            }
                        </div>
                        <div className="col mb-4 order-md-2 mb-4">
                                <form onSubmit={saveChanges} className="needs-validation" >
                                <div className="form-group row">
                                    <h2>Información</h2>
                                    </div>
                                    <div className="form-group">
                                        <label for="name">Nombre *</label>
                                        <input type="text" className="form-control" id="name" placeholder="Nombre del superhéroe" defaultValue={name} onChange={(e)=>setName(e.target.value)} required/>
                                    </div>
                                    <div className="form-group">
                                        <label for="character">Nombre real</label>
                                        <input type="text" className="form-control" id="character" placeholder="Nombre real del superhéroe" defaultValue={character} onChange={(e)=>setCharacter(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label for="year">Año *</label>
                                        <input type="number" className="form-control" id="year" defaultValue={year} onChange={(e)=>setYear(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label for="biography">Biografía *</label>
                                        <textarea className="form-control" id="biography" placeholder="Breve historia del héroe" rows="3" defaultValue={biography} onChange={e=>setBiography(e.target.value)} required></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="house">Casa *</label>
                                        <select class="form-control" id="house" onChange={e=>setHouse(e.target.value)} defaultValue={house}>
                                            <option value="MARVEL">MARVEL</option>
                                            <option value="DC">DC</option>
                                        </select>
                                    </div>
                                    {(house)?
                                    <div className="text-center">
                                        <img src={require (`../images/${house.toLowerCase()}.jpg`)} className="img-fluid" height="60" width="230"></img>
                                    </div>
                                    :
                                    null
                                    }           
                                    <div className="form-group">
                                        <label for="equipment">Equipamiento</label>
                                        <input type="text" className="form-control" id="equipment" placeholder="Armas y armadura" defaultValue={equipment} onChange={(e)=>setEquipment(e.target.value)} />
                                    </div>
                                    {(info.images)?
                                        <div className="form-group">
                                        <label for="img">Cantidad de imágenes</label>
                                        <input type="number" className="form-control" id="img" defaultValue={info.images.length} min="0" max={info.images.length}/>
                                        </div>
                                    :
                                    null
                                    }
                                    <p class="text-danger">(*) Campos obligatorios</p>
                                    <button type="submit" class="btn btn-primary">Guardar cambios</button>
                                    <button type="button" class="btn btn-danger" onClick={deleteHero} >Eliminar personaje</button>
                                </form>
                        </div>
                    </div>
                    }
                    
                </div>
                }
        </div>
    );
    

    ;
};

export default withRouter (HeroInfo);