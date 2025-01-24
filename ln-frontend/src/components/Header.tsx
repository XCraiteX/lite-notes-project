import Logged from "./Logged"

export default function Header(){
    return (<header className="z-1000 flex w-full h-[8vh] fixed bg-[#000] justify-between text-[#fff] items-center p-[14px] text-[1.2em] font-bold">
        <div className="flex h-[100%] gap-[20px] text-[1.4em]">
            <img src="images/logo.svg"/>
            <a href="#" className="flex items-center">Lite Notes</a>
        </div>
        <Logged/> 
    </header>)
}