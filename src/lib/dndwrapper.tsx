"use client"
import { closestCorners, DndContext } from "@dnd-kit/core";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const DNDwrapper: React.FC<Props> = ({ children }) => {
  return (
    <DndContext collisionDetection={closestCorners}>
      {children}
    </DndContext>
  );
};
