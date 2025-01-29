import { WEBSITE_URL } from "../config"

interface NoteProps{
    name: string,
    link: string
}

export default function NoteCard({name, link} : NoteProps){
    function Copy(text: string){
        navigator.clipboard.writeText(text)

        const copy_button_elem = document.querySelector('#copy_btn') as HTMLElement
        copy_button_elem.textContent = 'Copied!'
    }

    return(<div className="w-full flex bg-white shadow-md rounded-[12px]">
        <div className="h-full">
            <img src="images/note.svg" className="h-full p-[12px]"/>
        </div>
        
        <div className="text-black flex items-center justify-between w-full p-[16px]">
            <h3 className="text-[1.2em]">{name}</h3>
            <div className="flex gap-[16px]">
                <a href={link} className="bg-black cursor-pointer text-white px-[24px] py-[8px] rounded-[8px] border-[2px] border-[#000] duration-[0.3s] hover:bg-[#fff]/0 hover:text-[#000]">Edit</a>
                <a onClick={() => Copy(WEBSITE_URL + link)} id='copy_btn' className="bg-black cursor-pointer text-white px-[24px] py-[8px] rounded-[8px] border-[2px] border-[#000] duration-[0.3s] hover:bg-[#fff]/0 hover:text-[#000]">Share</a>
            </div>
        </div>
    </div>)
}