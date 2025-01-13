import Image from "next/image";
import Header from "@/components/ui/header"
import Card from "@/components/ui/cards/card"
export default function Home() {
  return (
    <main className="p-4 overflow-scoll flex ">
      <Card title={"in progress"} description={"in delay "} />
    </main>
  );
}
