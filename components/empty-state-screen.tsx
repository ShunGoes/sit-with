import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

type EmptyStateScreenProps =
  | {
      image: string;
      title: string;
      alt: string;
      isBtn: true;
      btnDetails: {
        icon?: string;
        href: string;
        iconAlt: string;
        btnText: string;
      };
    }
  | {
      image: string;
      title: string;
      alt: string;
      isBtn: false;
      btnDetails?: never;
    };

const EmptyStateScreen = ({
  image,
  title,
  isBtn,
  btnDetails,
  alt,
}: EmptyStateScreenProps) => {
  return (
    <section className="flex-1   flex justify-center items-center ">
      <div className="space-y-7 w-[80%]  lg:w-3/12  h-full">
        <div className="relative max-w-[200px] mx-auto   aspect-214/146">
          <Image src={image} alt={alt} fill className="object-cover" />
        </div>
        <p className="paragraph text-[14px] text-[#151515]  text-center ">
          {title}
        </p>
        {isBtn && (
          <div className="w-full  flex justify-center items-center">
            <Link
              href={btnDetails.href}
              className=" w-full flex justify-center"
            >
              <Button className="flex items-center gap-3 h-10 cursor-pointer">
                <Image
                  src={btnDetails.icon  || ""}
                  alt={btnDetails.iconAlt}
                  width={14}
                  height={14}
                />
                {btnDetails.btnText}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmptyStateScreen;
