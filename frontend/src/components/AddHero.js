import React,{useState} from "react";
import {withRouter} from 'react-router-dom';
import {alertConfirm, alertSuccess, alertError,addItem} from "../functions";

const AddHero = ({history}) => {

    const [name,setName] = useState ("");
    const [character,setCharacter] = useState ("");
    const [biography,setBiography] = useState ("");
    const [house,setHouse] = useState ("MARVEL");
    const [year,setYear] = useState (0);
    const [equipment,setEquipment] = useState ("");

    const add = async (e) => {
        e.preventDefault()
        alertConfirm ()
        .then ((res=>{
            if (res.value){
                let data;
                if (equipment === ""){
                    data = {
                        name,
                        character,
                        biography,
                        house,
                        year,
                        images:["red_skull.jpg"]
                    }
                }else{
                    data = {
                        name,
                        character,
                        biography,
                        house,
                        year,
                        images:["red_skull.jpg"],
                        equipment
                    }
                }               
                addItem (data)
                .then (()=>{
                    alertSuccess ()
                    .then(()=>{
                        history.push('/');
                    })
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

    return (
        <div className="row row-cols-1 row-cols-md-2">
        <div className="col mb-4 order-md-1 mb-4">
            <form onSubmit={add} className="needs-validation" >
            <h2>Cargar superhéroe</h2>
            <div className="form-group row">
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
            <div className="form-group">
            <label for="img">Cantidad de imágenes</label>
            <input type="number" className="form-control" id="img" min="0"/>
            </div>                                                                         
            <p class="text-danger">(*) Campos obligatorios</p>
            <button type="submit" class="btn btn-primary">Agregar superhéroe</button>
        </form>     
        </div>
        </div>   
    );
};

export default withRouter (AddHero);