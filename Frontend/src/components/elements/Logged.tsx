"use client"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { API_URL } from "../config"

export default function Logged(){

    const [isAuthorized, setisAuthorized] = useState(null)

    useEffect(() => {
        if(isAuthorized == null){
            axios.get(API_URL + '/me', { withCredentials: true })
            .then(response => setisAuthorized(response.data.authorized))
        }
    }, [])

    if (isAuthorized == null){
        return(<></>)
    }

    if (!isAuthorized){
        return (
            <nav className="flex gap-[20px] items-center">
                <a href="register" className="hover:underline">Register</a>
                <a href="login" className="flex text-[#000] bg-[#fff] px-[32px] py-[4px] rounded-[6px] border-[1px] border-[#fff] duration-[0.3s] hover:bg-[#fff]/0 hover:text-[#fff]">Login</a>
            </nav>
        )
    }

    return(
        <a href="../profile" className="flex mr-[8px] text-[#000] bg-[#fff] px-[22px] py-[4px] rounded-[6px] border-[1px] border-[#fff] duration-[0.3s] hover:bg-[#fff]/0 hover:text-[#fff]">Profile</a>
    )

}
