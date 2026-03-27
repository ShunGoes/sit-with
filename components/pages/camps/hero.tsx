import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";

export function CampHero() {
  return (
    <section
      style={{
        backgroundImage: "url('/images/camp-hero.png')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-[90dvh] h-dvh w-full "
    >
      <div className="h-full  mx-auto max-w-6xl w-11/12 flex flex-col justify-center">
        <div className="flex flex-col justify-center items-center text-center gap-4 h-full w-[70%] mx-auto ">
          <h1 className="text-[#F9FDF9] font-semibold text-[80px] leading-[1.1em] ">
            Sit-With-PD Annual Camping Programme
          </h1>
          <p className="text-[20px] text-[#F7FBF6]">
            A presence-based retreat designed to help you pause, reflect, and
            reconnect with yourself in a calm and supportive environment
          </p>
          <div className="flex justify-center w-full gap-4 m-4">
            <Button variant={"regular"}>
              Applu Now <CaretRight />{" "}
            </Button>
            <Button variant={"outline"}>Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
