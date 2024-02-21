import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function People()
{
    const [people,setPeople] = useState([]);

    const searchInput = useRef(null);

    useEffect(
        ()=>
        {
            axios.get("/api/person")
            .then(
                (resp)=>
                {
                    //console.log(resp);
                    //let personeBelle = resp.data.map(p=>({...p,dob:p.dob.substring(0,10)}));

                    let personeBelle = [];
                    for(let p of resp.data)
                    {
                        p.dob = p.dob.substring(0,10);
                        personeBelle.push(p);
                    }

                    setPeople(personeBelle);
                }
            );
        },
        []
    );

    function cancellaDavide(id)
    {
       axios.delete("/api/person/"+id).then
       (
            ()=>
            {
                let clone = [...people];
                let pos = clone.findIndex(p=>p.id==id);
                clone.splice(pos,1);
                setPeople(clone);
            }

       )
    }

    function handleChange(event,id)
    {
        let clone = [...people];
        let pos = clone.findIndex(p=>p.id==id);
        clone[pos][event.target.name] = event.target.value;

        setPeople(clone);
    }

    function search()
    {
        let key = searchInput.current.value;

        let clone = [...people];
        clone = clone.filter(p=>p.name.includes(key));
        setPeople(clone);    
    }

    return(

        <>
            <input ref={searchInput} type="text" placeholder="metti nome" />
            <input type="button" value="cerca" onClick={search}/>

            {people.map(p => 
                            <div>
                                <input type="text" name="name" value={p.name} onChange={(event)=>handleChange(event,p.id)}/>
                                <input type="text" name="surname" value={p.surname} onChange={(event)=>handleChange(event,p.id)}/>
                                <input type="date" name="dob" value={p.dob} onChange={(event)=>handleChange(event,p.id)}/>
                                <button onClick={function(){cancellaDavide(p.id)}}>X</button>
                            </div>
            )}
        </>

    );
}

//export default People;