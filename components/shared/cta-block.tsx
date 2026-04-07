import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";

export interface CtaBlockProps {
  title: string;
  subtext: string;
  firstLink?: {
    text: string;
    href?: string;
  };
  secondLink?: {
    text: string;
    href?: string;
  };
}

export function CtaBlock({
  title,
  subtext,
  firstLink,
  secondLink,
}: CtaBlockProps) {
  return (
    <section className="bg-footer-bg py-24 w-full text-center mt-12">
      <div className="container mx-auto px-4 md:px-8 flex flex-col gap-4 w-full lg:w-[42%]  items-center">
        <h2 className="heading-2 text-[#EBECEB] ">{title}</h2>
        <p className="text-[#F7FBF6] text-[16px]  leading-[140%]  max-w-2xl ">
          {subtext}
        </p>

        <div className="flex gap-4 items-center justify-center mt-3">
          {firstLink && (
            <Button variant={"regular"} className="rounded-[8px]">
              {firstLink.text} <CaretRight />{" "}
            </Button>
          )}

          {secondLink && <Button variant={"outline"} className="rounded-[8px]">{secondLink.text}</Button>}
        </div>
      </div>
    </section>
  );
}
