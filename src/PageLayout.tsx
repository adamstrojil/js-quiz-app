import { ReactNode } from "react";

type Props = { navigation: ReactNode; children: ReactNode; footer: ReactNode };

const styles = {
  minHeight: "100vh",
  display: "grid",
  gridTemplateRows: "1fr auto",
};

export function PageLayout({ navigation, children, footer }: Props) {
  return (
    <div style={styles}>
      <div>
        {navigation}
        {children}
      </div>
      {footer}
    </div>
  );
}
