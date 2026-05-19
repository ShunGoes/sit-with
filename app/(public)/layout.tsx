import { Navbar } from "@/components/nav/navbar";
import { ViewTransition } from "react";
import { ThemeReset } from "@/components/theme-reset";
import { Footer } from "@/components/footer/footer";
import FloatingActions from "@/components/chatbot/floating-actions";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeReset />
      <Navbar />
      <ViewTransition>
        <main className="flex-1">{children}</main>
      </ViewTransition>
       <div className="p-5">
      <Footer />
    </div>
    <FloatingActions />
    </>
  );
}
