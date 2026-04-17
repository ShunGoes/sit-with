import { ThemeReset } from "@/components/theme-reset";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen md:min-h-svh md:h-auto lg:h-dvh bg-[#EBECEB]  flex items-center justify-center md:py-12 md:px-4">
      <ThemeReset />
      <div className="w-11/12 h-full max-w-7xl   flex justify-center items-center overflow-hidden  scrollbar-hide md:w-[60%] lg:w-[90%] xl:w-[70%] mx-auto">{children}</div>
    </div>
  );
}
