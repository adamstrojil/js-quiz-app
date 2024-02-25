import { ReactNode } from "react";

export function OptionsList({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: "auto",
        marginRight: "auto",
        width: "60vw",
      }}
    >
      {children}
    </div>
  );
}
