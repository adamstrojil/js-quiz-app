import { Button } from "../Shared";

type Props = {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
  onResetAnswers: () => void;
};

export function QuestionListFooter({
  isVisible,
  setVisible,
  onResetAnswers,
}: Props) {
  const actionsPanelStyles = {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    gap: "1rem",
  } as const;
  const buttonStyles = {
    marginBottom: "48px",
    ...(!isVisible && { borderRadius: "0 0 8px 8px" }),
  };
  const buttonText = `${isVisible ? "Hide" : "Show"} question list`;

  return (
    <div style={actionsPanelStyles}>
      <Button style={buttonStyles} onClick={() => setVisible(!isVisible)}>
        {buttonText}
      </Button>
      {isVisible && (
        <Button
          style={buttonStyles}
          onClick={() => {
            onResetAnswers();
            setVisible(!isVisible);
          }}
        >
          ↻ Reset Answers
        </Button>
      )}
    </div>
  );
}
