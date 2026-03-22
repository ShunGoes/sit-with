export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#EBECEB] flex items-center justify-center md:py-12 md:px-4">
      <div className="w-full max-w-full md:w-[60%] lg:w-[90%] xl:w-[70%] mx-auto">{children}</div>
    </div>
  );
}
