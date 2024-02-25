import { colors } from "../colors";

const FOOTER_LINK = (
  <a target="_blank" href="https://github.com/lydiahallie/javascript-questions">
    github repo
  </a>
);

const styles = {
  height: "2.5rem",
  marginTop: "2rem",
  color: colors.lightgray,
};

export function Footer() {
  return <footer style={styles}>Based on Lydia Hallie's {FOOTER_LINK}.</footer>;
}
