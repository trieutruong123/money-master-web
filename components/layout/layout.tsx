import { ReactNode } from "react";
import { Navbar, FooterComponent } from "components";

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  const FOOTER_HEIGHT_PX = "256px";
  return (
    <>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ paddingBottom: FOOTER_HEIGHT_PX }}>{children}</div>
        <FooterComponent />
      </div>
    </>
  );
}
