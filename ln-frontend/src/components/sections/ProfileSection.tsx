import NoteCard from "../NoteCard"

export default function ProfileSection(){
    
    
    return(
    <div className="bg-black/5 h-[100vh]">
        <section className="flex">
            <div className="flex mt-[7vh] w-full">
                <div className="flex bg-black w-full border-t-[1px] justify-center p-[18px] gap-[12px] shadow-xl">
                    <img src="https://pic.rutubelist.ru/user/5b/b9/5bb944180dd48e715be6ff7a73790f0b.jpg"
                        className="flex w-[160px] rounded-[50%] m-[16px] shadow-md shadow-white"/>
                    <div className="text-white flex text-[1.8em] justify-center flex-col">
                        <h3>Nickname</h3>
                        <h4 className="text-white/70 text-[0.8em]">Notes - 12</h4>
                    </div>
                </div>
            </div>
        </section>

        <section className="flex w-full">
            <div className="flex p-[22px] w-full justify-center items-center flex-col">
                <div className="flex justify-center w-[60%] flex-col gap-[12px]">
                    <NoteCard name="Name for note"/>
                    <NoteCard name="Name for note"/>
                    <NoteCard name="Name for note"/>
                    <NoteCard name="Name for note"/>
                    <NoteCard name="Name for note"/>
                </div>
            </div>
        </section>
        
        <div className="fixed bottom-[20px] right-[20px] flex items-center gap-[20px]">
            <p className="text-[1.2em]">Create new Note!</p>
            <a href="../note?new" className=" bg-black w-[70px] h-[70px] rounded-[50%] flex justify-center items-center cursor-pointer duration-[0.4s] border-2 border-black hover:bg-black/0 text-white hover:text-black">
                <h3 className=" text-[2em]">+</h3>
            </a>
        </div>
    </div>)
}