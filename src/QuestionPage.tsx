import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isQuestionListVisible: boolean;
  isQuestionVisible: boolean;
};

export function QuestionPage({
  children,
  isQuestionVisible,
  isQuestionListVisible,
}: Props) {
  const styles = {
    opacity: isQuestionListVisible || !isQuestionVisible ? "0" : "1",
    visibility: isQuestionListVisible ? "hidden" : "visible",
    transition: "ease 0.5s",
  } as const;

  return <main style={styles}>{children}</main>;
}
