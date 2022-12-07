import { HTMLProps, ReactNode } from "react";

type ButtonVariant = "correct" | "wrong" | "notAnswered";

type PublicProps = {
  children: ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  type?: "submit" | "button" | "reset"; // TS cries otherwise
};

type Props = PublicProps & HTMLProps<HTMLButtonElement>;

const variantToColorMap: {
  [key in ButtonVariant]: string;
} = {
  correct: "#43ac9a",
  wrong: "#c1554c",
  notAnswered: "",
};

export function QuestionListButton({
  onClick,
  children,
  variant = "notAnswered",
}: Props) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: variantToColorMap[variant], padding: "0.6em" }}
    >
      {children}
    </button>
  );
}
