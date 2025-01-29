'use client'
import React, { useState, useEffect, use } from 'react'
import axios from 'axios'
import { useSearchParams } from "next/navigation";
import { API_URL } from '../config';

type Note = {
    name: string,
    content: string,
    owner: boolean
}

export default function NoteEditor(){

    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [owner, setOwner] = useState(false)

    const searchParams = useSearchParams(); 
    const note_id = searchParams.get('id');
    
    useEffect(() => {
        const save_btn = document.querySelector("#save_btn") as HTMLElement

        axios.get<Note>(API_URL + "/note?id=" + note_id, { withCredentials: true})
        .then(response => {
            if (response.status == 200){
                setName(response.data.name)
                setContent(response.data.content)
                setOwner(response.data.owner)
            }
        })
        .catch(() => {})
    }, [])

    const UpdateNote = async (event: React.FormEvent) => {
        const name_elem = document.querySelector('#note_name') as HTMLInputElement
        const content_elem = document.querySelector('#note_content') as HTMLInputElement
        const status_info = document.querySelector('#status') as HTMLElement

        const data = { name: name_elem.value, content: content_elem.value }
        const response = await axios.put(API_URL + '/edit_note?id=' + note_id, data, { withCredentials: true })

        status_info.textContent = response.data.details + '!'

        console.log(response.data)
    }
    
    return(
        <section className="w-full flex min-h-[100vh] bg-[#161616]">
            <div className="w-full mt-[6vh] p-[26px]">
                { !owner && (<div className='fixed bg-black/0 w-full h-full z-500'></div>) }
                <div className="w-full flex flex-col text-white gap-[12px]">
                    <div className="flex gap-[20px] items-center w-full">
                        <input id="note_name" value={name} onChange={e => setName(e.target.value)} className="min-w-[20%] max-w-[30%] p-[4px] bg-[#040404] text-[1.2em] outline-none rounded-[6px]" type="text" placeholder="Title"/>
                        { owner && (
                            <button onClick={UpdateNote} id="save_btn" className="rounded-[6px] bg-[#323232] px-[22px] py-[6px] duration-[0.2s] hover:bg-[#424242]">Save Changes</button>
                        )}
                        <p id='status'></p>
                    </div>

                    <textarea value={content} onChange={e => setContent(e.target.value)} id="note_content" className="bg-[#040404] h-[80vh] p-[8px] outline-none rounded-[12px]"></textarea>
                </div>
            </div>
        </section>
    )
}