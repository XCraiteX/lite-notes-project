'use client'
import React, { useState, useEffect, Suspense } from 'react'
import axios from 'axios'
import { useSearchParams } from "next/navigation";
import { API_URL } from '../config';

function AllData(){
    
    const searchParams = useSearchParams();
    const note_id = searchParams.get('id');
    
    const create_note = async (event: React.FormEvent) => {
        event.preventDefault();

        const note_name_input = document.querySelector('#note_name') as HTMLInputElement;
        const note_name = note_name_input.value;

        const note_content_input = document.querySelector('#note_content') as HTMLInputElement;
        const note_content = note_content_input.value;

        const data = { name: note_name, content: note_content };
        const response = await axios.post(API_URL + '/create_note', data, { withCredentials: true });

        if (response.data.status == "OK"){
            window.location.replace('../profile')
        }
        console.log(response.data);
    }

    return(
        <section className="w-full flex min-h-[100vh] bg-[#161616]">
            <div className="w-full mt-[6vh] p-[26px]">
                <div className="w-full flex flex-col text-white gap-[12px]">
                    <div className="flex gap-[20px] items-center w-full">
                        <input id="note_name" className="min-w-[20%] max-w-[30%] p-[4px] bg-[#040404] text-[1.2em] outline-none rounded-[6px]" type="text" placeholder="Title"/>
                        <button onClick={create_note} className="rounded-[6px] bg-[#323232] px-[22px] py-[6px] duration-[0.2s] hover:bg-[#424242]">Save</button>
                    </div>

                    <textarea id="note_content" className="bg-[#040404] h-[80vh] p-[8px] outline-none rounded-[12px]"></textarea>
                </div>
            </div>
        </section>
    )
}

export default function CreateNote(){
    return(
        <Suspense>
            <AllData/>
        </Suspense>
    )
}
