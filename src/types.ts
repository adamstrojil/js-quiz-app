export type Optional<T> = T | null;

export type Question = {
  id: string;
  question: string;
  code?: string;
  options: Array<{
    id: string;
    option: string;
  }>;
  explanation: string;
  correctAnswer: string;
  answer: Optional<string>;
};

export type Answer = {
  questionNumber: string;
  correctAnswer: string;
  answer: Optional<string>;
};

export type Option = {
  id: string;
  option: string;
};

export type OptionVariant = "correct" | "incorrect" | "notAnswered";
