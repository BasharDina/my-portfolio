// app/components/ui/Section.tsx
import React from "react";

type Props = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

export default function Section({ id, children, className = "", innerClassName = "" }: Props) {
  return (
    <section
      id={id}
      className={[
        // IMPORTANT: يقلّل الفراغات بين السكاشنز
        "relative py-14 md:py-18",
        // IMPORTANT: عشان لما تضغط من الـ navbar ما يطلع المحتوى تحت الـ navbar
        "scroll-mt-[90px]",
        className,
      ].join(" ")}
    >
      <div className={["mx-auto max-w-[1180px] px-6", innerClassName].join(" ")}>
        {children}
      </div>
    </section>
  );
}