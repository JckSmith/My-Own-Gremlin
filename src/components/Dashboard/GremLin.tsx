import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDepleteGremlin } from './hooks';

const GremLin = (props: any): JSX.Element => {
    const [gremlin,setGremlin] = useState<any>();
    console.log(props);
    const {id} = props.location?.state || {};

    useDepleteGremlin(gremlin,setGremlin);

    useEffect(() => {
        axios.get(`http://[::1]:3000/gremlins/${id}`).then(({data})=>setGremlin(data)).catch(e=>console.error(e))
    },[])
    
    if(gremlin){
const {name,hunger,satisfaction} = gremlin;
    return (
        <>
          <div>Name: {name}</div>
          <div>Hunger: {hunger}</div>
          <div>Satisfaction: {satisfaction}</div>
          <div> </div>
        
        <button disabled={gremlin.hunger===100} onClick={async()=>{
            if(gremlin.hunger<100){
            await axios.put(`http://[::1]:3000/gremlins/${gremlin.id}`, {
                hunger: gremlin.hunger + 5,
                satisfaction: gremlin.satisfaction + 10
              });
              setGremlin((prev:any) => ({...prev,hunger:prev.hunger+1}));}
        }}>FEED</button>
           <img src="https://www.pngkey.com/png/detail/821-8219397_orange-cat-cat-pixel-art.png"/> 
        </>
    )
    }

    return <div>LOADING</div>
}

export default GremLin;