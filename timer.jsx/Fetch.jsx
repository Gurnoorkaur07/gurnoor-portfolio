import React, {useEffect} from 'react'

const Fetch=()=>{
    useEffect(()=>{
        const FetchUser=async()=>{
            const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
            const data=await response.json();
            console.logo(data)
        }
        FetchUser()
    })
    return(
        <>
        <p>Go to Console to check output</p>
        {(user)?<n>{user name}</n>}
        </>
    )
}