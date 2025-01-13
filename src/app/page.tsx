import Card from "@/components/ui/cards/card"
import { MdPendingActions } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { tasks } from "@/data/data";

export default function Home() {
  return (
    <main className="p-4 overflow-scoll flex  justify-center mt-5 gap-8">
      <Card title={"to do"} icon={<CiViewList size={22} />} items={tasks.todo} />
      <Card title={"pending"} icon={<MdPendingActions size={22} />} items={tasks.pending} />
      <Card title={"done"} icon={<IoCheckmarkDoneCircle size={22} />} items={tasks.done} />
    </main>
  );
}
