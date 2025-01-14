"use client"
import Card from "@/components/ui/cards/card"
import { MdPendingActions } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { TODO } from "@/data/data";
import { Pending } from "@/data/data";
import { Done } from "@/data/data";
import { tasks } from "@/data/data";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";

export default function Home() {
  return (
    <main className="p-4     flex  justify-center mt-5 gap-8">
      <SortableContext items={tasks} strategy={horizontalListSortingStrategy}>
        <Card title={"to do"} icon={<CiViewList size={22} />} items={TODO} />
        <Card title={"pending"} icon={<MdPendingActions size={22} />} items={Pending} />
        <Card title={"done"} icon={<IoCheckmarkDoneCircle size={22} />} items={Done} />
      </SortableContext>
    </main>
  );
}
