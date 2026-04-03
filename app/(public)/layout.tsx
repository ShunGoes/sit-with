import { Navbar } from "@/components/nav/navbar";
import { ConditionalFooter } from "@/components/footer/conditional-footer";
import { ViewTransition } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <ViewTransition>
        <main className="flex-1">{children}</main>
      </ViewTransition>
      <ConditionalFooter />
    </>
  );
}
