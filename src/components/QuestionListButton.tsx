import { HTMLProps, ReactNode, useRef } from "react";
import { Optional } from "../types";

type ButtonVariant = "correct" | "wrong" | "notAnswered";

type PublicProps = {
  children: ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  hasFocus: boolean;
  type?: "submit" | "button" | "reset"; // TS is crying otherwise
};

type Props = PublicProps & HTMLProps<HTMLButtonElement>;

const variantToBackgroundColorMap: {
  [key in ButtonVariant]: string;
} = {
  correct: "#43ac9a",
  wrong: "#c1554c",
  notAnswered: "",
};

export function QuestionListButton({
  onClick,
  children,
  hasFocus,
  variant = "notAnswered",
  ...rest
}: Props) {
  const buttonRef = useRef<Optional<HTMLButtonElement>>(null);

  hasFocus && buttonRef.current?.focus();

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      style={{
        backgroundColor: variantToBackgroundColorMap[variant],
        padding: "0.6em",
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
