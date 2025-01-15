"use client"
import Card from "@/components/ui/cards/card";
import { tasks } from "@/data/data";
import { useEffect, useMemo, useState } from "react";
import { closestCorners, DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { ColumnType, TaskType } from "@/Types/types";
import Task from "@/components/ui/cards/task";
import { Loading } from "@/components/shared/loading"
import Header from "@/components/ui/header";
import Dropdown from "@/components/shared/dropdown"
import { FaRedo, FaUndo } from "react-icons/fa";

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

  });
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [filterBy, setFilterby] = useState("All")
  const [isActive, setisActive] = useState(false)
  const [history, setHistory] = useState<ColumnType[][]>([]);
  const [redoStack, setRedoStack] = useState<ColumnType[][]>([]);


  const redo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack.pop();
    setHistory((prev) => [...prev, columns]);
    setColumns(nextState!);
  };

  const undo = () => {
    if (history.length === 0) return;
    const previousState = history.pop();
    setRedoStack((prev) => [...prev, columns]);
    setColumns(previousState!);
  };

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
      setHistory((prev) => [...prev, columns]);
      setRedoStack([]);
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
    setHistory((prev) => [...prev, columns]);
    setRedoStack([]);
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
    setHistory((prev) => [...prev, columns]);
    setRedoStack([]);
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

  if (!columns) return <Loading />

  return (<>
    <Header setisActive={setisActive} isActive={isActive} />
    <main className="p-4  flex  justify-center mt-5 gap-8 relative">
      <div className="fixed bottom-5 left-[16rem] flex  gap-5 text-2xl p-2 bg-gray-700 ">
        <button onClick={undo} disabled={history.length === 0} className="flex flex-row-reverse items-center gap-2 hover:text-gray-400 ">Undo<FaUndo size={22} /></button>
        <button onClick={redo} disabled={history.length === 0} className="flex flex-row-reverse items-center gap-2 hover:text-gray-400 ">Redo <FaRedo size={22} /></button>
      </div>
      {isActive && <Dropdown tasks={columns} setFilterby={setFilterby} />}
      <DndContext
        data-testid="dnd-context"
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {
          columns
            .filter((column) => {
              if (filterBy === "All") return true;
              return column.title.toLowerCase() === filterBy.toLowerCase();
            })
            .map((column, index) => {
              return (
                <div key={index}>
                  <Card
                    data-testid="column"
                    items={column}
                    addTask={addTask}
                    deleteTask={deleteTask}
                  />
                </div>
              );
            })
        }
        <DragOverlay>
          {activeTask ? <Task onClick={() => console.log('button is clicked ')} data-testid="task-item" task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </main>
  </>
  );
}
