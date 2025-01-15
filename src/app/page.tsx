"use client"
import Card from "@/components/ui/cards/card";
import { tasks } from "@/data/data";
import { useEffect, useMemo, useState } from "react";
import { closestCorners, DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { ColumnType, TaskType } from "@/Types/types";
import Task from "@/components/ui/cards/task";


export default function Home() {

  const [columns, setColumns] = useState<ColumnType[]>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("columns");
      try {
        return storedData ? JSON.parse(storedData) : tasks;
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        return tasks; 
      }
    }
    return tasks; 
  });
  
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);



  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (!active.id) {
      console.warn("Drag started with undefined ID");
      return;
    }
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
    if (!active.id) {
      console.warn("Drag ended with undefined active ID");
      return;
    }
    if (!over.id) {
      console.warn("Drag ended with undefined over ID");
      return;
    }

    const activeColIndex = columns.findIndex((col) =>
      col.tasks.some((task) => task.id === active.id)
    );
    const overColIndex = columns.findIndex((col) =>
      col.id === over.id || col.tasks.some((task) => task.id === over.id)
    );
    if (activeColIndex !== -1 && overColIndex !== -1) {
      setColumns((columns) => {
        const activeCol = columns[activeColIndex];
        const overCol = columns[overColIndex];
        const activeTaskIndex = activeCol.tasks.findIndex(
          (task) => task.id === active.id
        );
        const overTaskIndex = overCol.tasks.findIndex(
          (task) => task.id === over.id
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
          if (overCol.id === over.id) {
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


  const addTask = (categoryId: string, title: string, description: string) => {
    setColumns((prevTasks) =>
      prevTasks.map((category: ColumnType) =>
        category.id === categoryId
          ? {
            ...category,
            tasks: [
              ...category.tasks,
              { id: Date.now().toString(), title, description },
            ],
          }
          : category
      )
    );
  };

  const deleteTask = (categoryId: string, taskId: string) => {
    setColumns((prevTasks) =>
      prevTasks.map((category: ColumnType) =>
        category.id === categoryId
          ? {
            ...category,
            tasks: category.tasks.filter((task) => task.id !== taskId),
          }
          : category
      )
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("columns", JSON.stringify(columns));
    }
  }, [columns]);
  useMemo(() => columns, [columns]);

  return (
    <main className="p-4  flex  justify-center mt-5 gap-8">
      <DndContext
        data-testid="dnd-context"
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {
          columns.map((column, index) => {
            return <div key={index}><Card data-testid="column" items={column} addTask={addTask} deleteTask={deleteTask} /></div>
          })
        }

        <DragOverlay>
          {activeTask ? <Task onClick={() => console.log('button is clicked ')} data-testid="task-item" task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </main>
  );
}
