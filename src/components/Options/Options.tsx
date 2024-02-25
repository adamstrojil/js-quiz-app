import { Question, Optional } from "../../types";
import { Option } from "./Option";
import { formatOptionText, getOptionVariant } from "./utils";
import { OptionsList } from "./OptionsList";

type Props = {
  question: Question;
  onAnswerSelect: (questionId: string, answer: Optional<string>) => void;
};

export function Options({ question, onAnswerSelect }: Props) {
  const { options, answer, correctAnswer } = question;
  const isQuestionAnswered = !!answer;

  const optionsItems = options.map(({ id, option }) => {
    const text = formatOptionText(id, option);
    const variant = getOptionVariant({
      id,
      answer,
      correctAnswer,
      isQuestionAnswered,
    });

    return (
      <Option
        key={id}
        id={id}
        onSelect={onAnswerSelect}
        variant={variant}
        question={question}
        text={text}
        isAnswered={isQuestionAnswered}
      />
    );
  });

  return <OptionsList>{optionsItems}</OptionsList>;
}
