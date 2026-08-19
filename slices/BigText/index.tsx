import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `BigText`.
 */
export type BigTextProps = SliceComponentProps<Content.BigTextSlice>;

/**
 * Component for "BigText" Slices.
 */
const BigText: FC<BigTextProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-screen w-screen overflow-hidden bg-orange-500"
    >
      <h2 className="grid w-full gap-[3vw] py-10 text-center text-yellow-400 font-black uppercase leading-[.7]">
        <div className="text-[34vw]">Soda</div>
        <div className="grid gap-[3vw] text-[34vw] md:flex md:text-[11vw]">
          <span className="inline-block">that </span>
          <span className="inline-block max-md:text-[27vw]">makes </span>
          <span className="inline-block max-md:text-[40vw]">you </span>
        </div>
        <div className="text-[32vw]">Smile</div>
      </h2>
    </section>
  );
};

export default BigText;
