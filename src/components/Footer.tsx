import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Footer({ children }: Props) {
  return (
    <footer
      className="read-the-docs"
      style={{ height: "2.5rem", marginTop: "2rem" }}
    >
      {children}
    </footer>
  );
}
