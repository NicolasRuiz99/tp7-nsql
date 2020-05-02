import React,{useState} from "react";
import {withRouter} from 'react-router-dom';
import {alertConfirm, alertSuccess, alertError,heroaddItem, upload} from "../functions";

const AddHero = ({history}) => {

    const [name,setName] = useState ("");
    const [character,setCharacter] = useState ("");
    const [biography,setBiography] = useState ("");
    const [house,setHouse] = useState ("MARVEL");
    const [year,setYear] = useState (0);
    const [equipment,setEquipment] = useState ("");
    const [files,setFiles] = useState ([]);
    const [images,setImages] = useState ([]);

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
                        images
                    }
                }else{
                    data = {
                        name,
                        character,
                        biography,
                        house,
                        year,
                        images,
                        equipment
                    }
                }              
                upload(files)
                .then ((res)=>{
                    heroaddItem (data)
                    .then (()=>{
                        alertSuccess ()
                        .then(()=>{
                            history.push('/hero');
                        })
                    })
                    .catch ((err)=>{
                        alertError ()
                        return;
                    })
                }) 
                .catch(err=>{
                    alertError();
                    return;
                })
            }else{
                return;
            }
        }))
        
    }

    const handleFiles = (e) => {
        const files = e.target.files;

        let images = [];

        let data = new FormData()

        for(let x = 0; x<files.length; x++) {
            data.append('file', files[x])
            images.push(files[x].name);
        }
        setImages (images)
        setFiles (data);

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
            <img src={`http://localhost:5000/image/${house.toLowerCase()}.jpg`} className="img-fluid" height="60" width="230"></img>                            
            </div>                        
            :
            null
            }                                                                    
            <div className="form-group">
            <label for="equipment">Equipamiento</label>
            <input type="text" className="form-control" id="equipment" placeholder="Armas y armadura" defaultValue={equipment} onChange={(e)=>setEquipment(e.target.value)} />
            </div>                                                                                
            <div className="form-group">
                <label for="exampleInputFile">Cargar imagen</label>
                <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" onChange={(e)=>handleFiles(e)} multiple required/>
                <small id="fileHelp" className="form-text text-muted">Imagen del superhéroe. (Mínimo 1)</small>
            </div>                                                                       
            <p class="text-danger">(*) Campos obligatorios</p>
            <button type="submit" class="btn btn-primary">Agregar superhéroe</button>
        </form>     
        </div>
        </div>   
    );
};

export default withRouter (AddHero);