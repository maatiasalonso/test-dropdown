import {
  HiOutlineFolder,
  HiOutlinePhotograph,
  HiOutlineTrash,
  HiOutlineUpload,
  HiOutlineZoomIn,
} from "react-icons/hi";

export const data = [
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
