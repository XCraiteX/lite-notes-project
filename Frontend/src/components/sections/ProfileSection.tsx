'use client'
import NoteCard from "../elements/NoteCard";
import axios from "axios"
import React, { useState, useEffect } from 'react'
import { API_URL } from '../config';

export default function ProfileSection(){

    const [notes, setNotes] = useState([])

    const [isAuthorized, setisAuthorized] = useState(null)

    useEffect(() => {
        if(isAuthorized == null){
            axios.get(API_URL + '/me', { withCredentials: true })
            .then(response => setisAuthorized(response.data.authorized))
        }
    }, [])

    useEffect(() => {
        if (isAuthorized){
            const get_notes = async () =>{
                const response = await axios.get(API_URL + '/get_notes', { withCredentials: true })

                if (response.data.status == "OK"){
                    setNotes(response.data.notes)
                }
            }
            get_notes();
            console.log('notes')
        }
        else if (isAuthorized == false){
            window.location.replace('../login')
        }
    }, [isAuthorized])

    const Logout = async (event) => {
        const response = await axios.get(API_URL + '/logout', { withCredentials: true })

        if (response.data.status == 'OK'){
            window.location.replace('../login')
        }
    }
    
    return(
    <div className="bg-black/5 h-[100vh]">
        <section className="flex">
            <div className="flex mt-[7vh] w-full">
                <div className="flex bg-black w-full border-t-[1px] justify-center p-[18px] gap-[12px] shadow-xl">
                    <img src="https://pic.rutubelist.ru/user/5b/b9/5bb944180dd48e715be6ff7a73790f0b.jpg"
                        className="flex w-[160px] rounded-[50%] m-[16px] shadow-md shadow-white"/>
                    <div className="text-white flex text-[1.8em] justify-center flex-col">
                        <h3>Profile</h3>
                        <h4 className="text-white/70 text-[0.8em]">Your notes here!</h4>
                        <a onClick={Logout} className="text-[0.7em] underline text-white/50 cursor-pointer duration-[0.3s] ">Logout</a>
                    </div>
                </div>
            </div>
        </section>

        <section className="flex w-full">
            <div className="flex p-[22px] w-full justify-center items-center flex-col">
                <div className="flex justify-center w-[60%] flex-col gap-[12px]">
                    {notes.map((note) => (
                        <NoteCard key={note.key}
                            name={note.name}
                            link={'/note?id=' + note.key}/>
                    ))}
                </div>
            </div>
        </section>
        
        <div className="fixed bottom-[20px] right-[20px] flex items-center gap-[20px]">
            <p className="text-[1.2em]">Create new Note!</p>
            <a href="../new_note" className=" bg-black w-[70px] h-[70px] rounded-[50%] flex justify-center items-center cursor-pointer duration-[0.4s] border-2 border-black hover:bg-black/0 text-white hover:text-black">
                <h3 className=" text-[2em]">+</h3>
            </a>
        </div>
    </div>)
}