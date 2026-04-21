import { Navbar } from "@/components/nav/navbar";
import { ConditionalFooter } from "@/components/footer/conditional-footer";
import { ViewTransition } from "react";
import { ThemeReset } from "@/components/theme-reset";
import { Footer } from "@/components/footer/footer";

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
    </>
  );
}
