import { Accordion, AccordionItem } from "@nextui-org/react";
import { data } from "@/config/data";

export const Information = () => {
  return (
    <section className="sm:px-12 text-justify">
      <h1 className="font-bold text-3xl text-center">
        Image Uploader & Organizer
      </h1>
      <div className="ml-2 mr-2 mt-10">
        <h2 className="text-xl font-semibold">Instructions</h2>
        <p className="mt-4">
          {`This component has been designed to make managing images on your
          platform a breeze. It offers you the flexibility to upload, view,
          organize, and even zoom in and out of your images effortlessly. Now,
          let's delve into how you can make the most of these
          functionalities:`}
        </p>
      </div>
      <Accordion
        className="mt-5 flex-col flex gap-3"
        itemClasses={{
          base: "dark:hover:bg-zinc-800/90 hover:bg-zinc-100 transition-all rounded-lg",
        }}
        defaultExpandedKeys={["1"]}
        variant="splitted"
        showDivider={false}
      >
        {data.map((item) => (
          <AccordionItem
            key={item.key}
            aria-label={item.ariaLabel}
            title={item.title}
            startContent={item.icon}
          >
            <p>{item.content}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
