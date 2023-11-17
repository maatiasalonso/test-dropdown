import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  HiOutlineFolder,
  HiOutlinePhotograph,
  HiOutlineTrash,
  HiOutlineUpload,
  HiOutlineZoomIn,
} from "react-icons/hi";

const data = [
  {
    key: 1,
    title: "Upload Images",
    ariaLabel: "Upload Images",
    icon: <HiOutlineUpload className="w-5 h-5" />,
    content: `To upload images, you can either click on the center area, which
            will open a file selection dialog, or you can drag and drop images
            from your file explorer onto this area. This component accepts image
            files only.`,
  },
  {
    key: 2,
    title: "View Images",
    ariaLabel: "View Images",
    icon: <HiOutlinePhotograph className="w-5 h-5" />,
    content: `Once images are uploaded, they appear in a grid below the upload
            area. Click on any image to view it in full size. A modal will open
            showing the selected image. Click anywhere outside the image to
            close this view.`,
  },
  {
    key: 3,
    title: "Zoom In & Out",
    ariaLabel: "Zoom In & Out",
    icon: <HiOutlineZoomIn className="w-5 h-5" />,
    content: `When viewing an image in full size, you can zoom in and out using
            Zoom In and Zoom Out buttons
            placed outside the modal on the top. Clicking
            Zoom In will increase the size of the image and
            the modal, while Zoom Out will decrease their
            sizes. Be mindful of your screen size when using the zoom features.`,
  },
  {
    key: 4,
    title: "Organize Images",
    ariaLabel: "Organize Images",
    icon: <HiOutlineFolder className="w-5 h-5" />,
    content: `The images can be reordered based on your preference. To do this,
            click and hold on an image you wish to move, then drag it to your
            desired location. Release the click to drop the image at that
            location.`,
  },
  {
    key: 5,
    title: "Delete Images",
    ariaLabel: "Delete Images",
    icon: <HiOutlineTrash className="w-5 h-5" />,
    content: `To delete an image, click on the Trash button located at the top
            right corner of the image card.`,
  },
];

export default function Information() {
  return (
    <div className="sm:px-12 text-justify">
      <h1 className="font-bold text-3xl text-center">
        Image Uploader & Organizer
      </h1>
      <div className="ml-2 mr-2 mt-10">
        <h2 className="text-xl font-semibold">Instructions</h2>
        <p className="mt-4">
          This component has been designed to make managing images on your
          platform a breeze. It offers you the flexibility to upload, view,
          organize, and even zoom in and out of your images effortlessly. Now,
          let&apos;s delve into how you can make the most of these
          functionalities:
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
    </div>
  );
}
