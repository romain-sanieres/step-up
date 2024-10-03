import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const accordionContent_1 = [
  {
    title: "Our Comfort Formula",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit et eos labore delectus laborum unde ducimus est",
  },
  {
    title: "Our Comfort Formula",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit et eos labore delectus laborum unde ducimus est",
  },
  {
    title: "Our Comfort Formula",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit et eos labore delectus laborum unde ducimus est",
  },
];
const accordionContent_2 = [
  {
    title: "Our Comfort Formula",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit et eos labore delectus laborum unde ducimus est",
  },
  {
    title: "Our Comfort Formula",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit et eos labore delectus laborum unde ducimus est",
  },
  {
    title: "Our Comfort Formula",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit et eos labore delectus laborum unde ducimus est",
  },
];

export default function PromotionalVideo() {
  return (
    <section className="flex flex-col items-center gap-y-14">
      <p className="text-center text-6xl max-w-2xl">
        Innovation that created magical comfort
      </p>
      <div className=" w-full max-w-3xl">
        <div className="h-96 bg-black/5 dark:bg-white/95 rounded-xl max-w-2xl mx-auto"></div>
        <div className="flex max-md:flex-col justify-between w-full mt-10">
          <Accordion type="single" collapsible className="w-full md:pr-10">
            {accordionContent_1.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Accordion type="single" collapsible className="w-full md:pl-10">
            {accordionContent_2.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
