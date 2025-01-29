"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

export default function LoginForm(){

    const Login = async (event) => {
        event.preventDefault();
        try{
            const email_input = document.querySelector('#email-input') as HTMLInputElement
            const password_input = document.querySelector('#password-input') as HTMLInputElement
            const status_elem = document.querySelector('#status_elem') as HTMLElement
            
            const email = email_input.value
            const password = password_input.value
            
            const data = { email: email, password: password }
            const response = await axios.post(API_URL + '/login', data, { withCredentials: true })

            if (response.data.status == 'OK'){
                window.location.replace('/profile')
            }
            
            status_elem.textContent = response.data.details
        }
        catch{
            console.log('Error')
        }
    }

    return(
        <section className="flex w-full min-h-[100vh] justify-center items-center" id="main">
            <form className="text-center min-w-[240px] max-w-[340px]" onSubmit={Login}>
                <h1 className="text-4xl">Login</h1><hr/>
                <input placeholder="Email" id="email-input" type="text" className="outline-none border-black border-solid border-[2px] rounded-md p-2 w-[100%] mt-10 text-lg"></input>
                <input placeholder="Password" id="password-input" type="password" className="outline-none border-black border-solid border-2 rounded-md p-2 w-[100%] mt-5 text-lg"></input>
                <input type='submit' value="Login" className='outline-none bg-black rounded-md p-2 w-[100%] mt-5 text-lg text-white border-black border-solid border-2 duration-200 hover:bg-white hover:text-black'/>
                <p id='status_elem' className='mt-[12px]'></p>
            </form>
        </section>
    )
}