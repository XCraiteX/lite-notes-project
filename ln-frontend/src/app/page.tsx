import Image from "next/image";
import Header from "@/components/Header";
import MainSection from "@/components/sections/MainSection";
import Background from "@/components/Background";

export default function Home() {
  return (<>
    <Background/>
    <Header/>
    <MainSection/>
  </>);
}
