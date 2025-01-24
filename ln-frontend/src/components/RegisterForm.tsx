"use client"
import axios from 'axios'
import React, { useState } from 'react';

export default function RegisterForm(){
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // предотвращаем перезагрузку страницы
        try {
            const response = await fetch('http://localhost:3800/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return(
        <section className="flex w-full min-h-[100vh] justify-center items-center" id="main">
            <form className="text-center w-min">
                <h1 className="text-4xl">Регистрация</h1>
                <input placeholder="Почта" name="login" type="text" className="outline-none border-x border-black border-solid border-2 rounded-md p-2 w-[100%] mt-10 text-lg"></input>
                <input placeholder="Пароль" name="password" type="password" className="outline-none border-x border-black border-solid border-2 rounded-md p-2 w-[100%] mt-5 text-lg"></input>
                <button type="submit" className="outline-none bg-black rounded-md p-2 w-[100%] mt-5 text-lg text-white border-black border-solid border-2 duration-200 hover:bg-white hover:text-black">Зарегистрироваться</button>
            </form>
        </section>
    )
}