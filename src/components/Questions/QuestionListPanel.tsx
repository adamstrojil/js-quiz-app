import { ReactNode, useEffect, useRef, useState } from "react";

import { Optional } from "../../types";

type Props = {
  isVisible: boolean;
  children: ReactNode;
};

export function QuestionListPanel({ isVisible, children }: Props) {
  const [questionListHeight, setQuestionListHeight] = useState(0);
  const ref = useRef<Optional<HTMLDivElement>>(null);

  useEffect(function updateQuestionListElementHeight() {
    const handleResize = () => {
      setQuestionListHeight(ref?.current?.offsetHeight || 0);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    marginTop: isVisible ? "2rem" : `-${questionListHeight + 16}px`, //16 (1rem) because of the marginBottom
    transition: "ease 0.5s", //TODO update with the keyframes animation
    marginBottom: "1rem",
  };
  return (
    <div ref={ref} aria-hidden={isVisible} style={styles}>
      {children}
    </div>
  );
}
