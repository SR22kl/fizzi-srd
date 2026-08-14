"use client";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";
import { useGSAP } from "@gsap/react";
import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { View } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FC } from "react";
import { Bubbles } from "./Bubble";
import Scene from "./Scene";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Props for `Banner`.
 */
export type BannerProps = SliceComponentProps<Content.BannerSlice>;

/**
 * Component for "Banner" Slices.
 */
const Banner: FC<BannerProps> = ({ slice }) => {
  const ready = useStore((state) => state.ready);

  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(
    () => {
      if (!ready && isDesktop) {
        return;
      }

      const introTI = gsap.timeline();

      introTI
        .set(".hero", { opacity: 1 })
        .from(".hero-header-word", {
          scale: 5,
          opacity: 0,
          ease: "power4.in",
          delay: 0.2,
          stagger: 1,
        })
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 50,
          },
          "+=0.8",
        )
        .from(".hero-body", {
          opacity: 0,
          y: 10,
        })
        .from(".hero-button", {
          opacity: 0,
          y: 10,
          duration: 0.5,
        });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTl
        .fromTo(
          "body",
          {
            backgroundColor: "#bef264",
          },
          {
            backgroundColor: "#FFF176",
            overwrite: "auto",
          },
          1,
        )
        .from(".text-side-heading .split-char", {
          scale: 1.3,
          y: 40,
          rotate: -25,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(3)",
          duration: 0.5,
        })
        .from(".text-side-body", {
          y: 20,
          opacity: 0,
        });
    },
    { dependencies: [ready, isDesktop] },
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero opacity-0"
    >
      {isDesktop && (
        <View className="hero-scene pointer-events-none sticky top-0 z-50 mt-[-100vh] hidden h-screen w-screen md:block">
          <Scene />
          <Bubbles count={300} speed={1} repeat={true} />
        </View>
      )}
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem] lg:text-[13rem]">
              <TextSplitter
                text={asText(slice.primary.heading)}
                wordDisplayStyle="block"
                className="hero-header-word"
              />
            </h1>
            <div className="hero-subheading mt-12 font-semibold text-sky-950 text-5xl lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>
            <div className="hero-body text-2xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.body} />
            </div>

            <Button
              className="hero-button mt-12"
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text}
            />
          </div>
        </div>

        <div className="grid text-side relative z-80 h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage
            className="md:hidden w-full"
            field={slice.primary.cans_image}
          />
          <div>
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-900 lg:text-8xl">
              <TextSplitter text={asText(slice.primary.second_heading)} />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-800">
              <PrismicRichText field={slice.primary.second_body} />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Banner;
