import { Accordion, AccordionItem } from "@nextui-org/react";

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
      <Accordion className="mt-5" defaultExpandedKeys={["1"]}>
        <AccordionItem key="1" aria-label="Upload Images" title="Upload Images">
          <p>
            To upload images, you can either click on the center area, which
            will open a file selection dialog, or you can drag and drop images
            from your file explorer onto this area. This component accepts image
            files only.
          </p>
        </AccordionItem>
        <AccordionItem key="2" aria-label="View Images" title="View Images">
          <p>
            Once images are uploaded, they appear in a grid below the upload
            area. Click on any image to view it in full size. A modal will open
            showing the selected image. Click anywhere outside the image to
            close this view.
          </p>
        </AccordionItem>
        <AccordionItem key="3" aria-label="Zoom In & Out" title="Zoom In & Out">
          <p>
            When viewing an image in full size, you can zoom in and out using
            <strong> Zoom In</strong> and <strong>Zoom Out</strong> buttons
            placed outside the modal on the top. Clicking
            <strong> Zoom In</strong> will increase the size of the image and
            the modal, while <strong>Zoom Out</strong> will decrease their
            sizes. Be mindful of your screen size when using the zoom features.
          </p>
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Organize Images"
          title="Organize Images"
        >
          <p>
            The images can be reordered based on your preference. To do this,
            click and hold on an image you wish to move, then drag it to your
            desired location. Release the click to drop the image at that
            location.
          </p>
        </AccordionItem>
        <AccordionItem key="5" aria-label="Delete Images" title="Delete Images">
          <p>
            To delete an image, click on the <strong>Trash</strong> button
            located at the top right corner of the image card.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
