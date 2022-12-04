export type Question = {
  id: string;
  question: string;
  code?: string;
  options: Array<{
    id: string;
    option: string;
  }>;
  description: string;
  correctAnswer: string;
};

export type Answer = {
  questionId: string;
  correctAnswer: string;
  answer: string | null;
};

export type Option = {
  id: string;
  option: string;
};

export type OptionVariant = "Correct" | "Incorrect" | "NotAnswered";
