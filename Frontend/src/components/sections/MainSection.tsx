export default function MainSection(){
    return(
        <section className="flex w-full min-h-[100vh] justify-center items-center" id="main">

            <div className="flex w-full h-full justify-center items-center text-[#000]">
                <div className="flex justify-between w-[50%] items-center">
                    <div className="flex flex-col">
                        <h2 className="text-[3.4em] font-bold underline">Lite Notes</h2>
                        <h4 className="text-[1.4em] font-bold text-[#000]/70">Simple sharing notes for you!</h4>
                        <button className="bg-[#000] flex justify-center text-[1.2em] w-[45%] text-[#fff] px-[12px] py-[8px] mt-[12px] border-[2px] border-[#000] hover:bg-[#000]/0 hover:text-[#000] duration-[0.3s]">View</button>
                    </div>
                    <img src="images/logo.svg" className="h-[320px] p-[32px] bg-[#000] rounded-[16px] mirror shadow-md shadow-[#000]"/>
                </div>
            </div>
        </section>
    )
}