import axios from "axios";
import { useEffect, useState } from "react";

export default function People()
{
    const [people,setPeople] = useState([]);

    useEffect(
        ()=>
        {
            axios.get("/api/person")
            .then(
                (resp)=>
                {
                    // console.log(resp);
                    setPeople(resp.data);
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


    return(

        <>
            {people.map(p => <h1>{p.name} {p.surname} 
            <button onClick={function(){cancellaDavide(p.id)}}>X</button></h1>)}
        </>

    );
}

//export default People;