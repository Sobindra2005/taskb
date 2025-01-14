"use client"
import Card from "@/components/ui/cards/card"
import { tasks } from "@/data/data";
import { useState } from "react";
import { closestCorners, DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { TaskType } from "@/Types/types";
import Task from "@/components/ui/cards/task";


export default function Home() {
  const [columns, setColumns] = useState(tasks);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  console.log(activeTask)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = columns
      .flatMap((col) => col.tasks)
      .find((task) => task.id === active.id);

    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
  
    const activeColIndex = columns.findIndex((col) =>
      col.tasks.some((task) => task.id === activeId)
    );
    console.log("this is active ", activeColIndex);
    const overColIndex = columns.findIndex((col) =>
      col.id === overId || col.tasks.some((task) => task.id === overId)
    );
    console.log("this is over ", overColIndex);
    if (activeColIndex !== -1 && overColIndex !== -1) {
      setColumns((columns) => {
        const activeCol = columns[activeColIndex];
        const overCol = columns[overColIndex];
        const activeTaskIndex = activeCol.tasks.findIndex(
          (task) => task.id === activeId
        );
        const overTaskIndex = overCol.tasks.findIndex(
          (task) => task.id === overId
        );

        if (activeColIndex === overColIndex) {
          const newTasks = arrayMove(
            activeCol.tasks,
            activeTaskIndex,
            overTaskIndex
          );

          const newColumns = [...columns];
          newColumns[activeColIndex] = {
            ...activeCol,
            tasks: newTasks,
          };
          return newColumns;
        } else {
          const newColumns = [...columns];
          const [movedTask] = activeCol.tasks.splice(activeTaskIndex, 1);
          if (overCol.id === overId) {
            overCol.tasks.push(movedTask);
          } else {
            overCol.tasks.splice(overTaskIndex, 0, movedTask);
          }
          return newColumns;
        }
      });
    }

    setActiveTask(null);
  };

  return (
    <main className="p-4  flex  justify-center mt-5 gap-8">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {
          columns.map((column, index) => {
            return <div key={index}><Card items={column} /></div>
          })
        }

        <DragOverlay>
          {activeTask ? <Task task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>


    </main>
  );
}
