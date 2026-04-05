import React, { useEffect, useState } from 'react'

const TitleUpdater = () => {
    const [name,setName]=useState('');
    useEffect(()=>{
        document.title=name;
    })
  return (
    <>
        <input type='text'value={name}onChange={(e=>setName(e.target.value))}></input>
    </>
  )
}

export default TitleUpdater