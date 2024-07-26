import React, { ReactNode } from "react";

export interface ITodoProps {
  children: ReactNode;
}

/**
 * Todo to leave little comments in my app about future functionality
 */
function Todo({ children }: ITodoProps) {
  return (
    <div
      style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 100 }}
    >
      TODO: {children}
    </div>
  );
}

export default Todo;
