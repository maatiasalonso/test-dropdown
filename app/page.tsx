"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Image } from "@nextui-org/image";
import { Card, CardBody } from "@nextui-org/card";
import { Badge } from "@nextui-org/badge";
import { PhotoIcon } from "@heroicons/react/24/outline";
import {
  Modal,
  ModalContent,
  ModalBody,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles((prev) => {
      const newFiles = acceptedFiles.filter(
        (file: File) =>
          !prev.some((f) => f.name === file.name && f.size === file.size)
      );
      return [...prev, ...newFiles];
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" as any,
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(files);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFiles(items);
  };
  return (
    <>
      <div className="sm:px-12 text-justify">
        <h1 className="font-bold text-2xl text-center">
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
          <AccordionItem
            key="1"
            aria-label="Upload Images"
            title="Upload Images"
          >
            <p>
              To upload images, you can either click on the center area, which
              will open a file selection dialog, or you can drag and drop images
              from your file explorer onto this area. This component accepts
              image files only.
            </p>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Viewing Images"
            title="Viewing Images"
          >
            <p>
              Once images are uploaded, they appear in a grid below the upload
              area. Click on any image to view it in full size. A modal will
              open showing the selected image. Click anywhere outside the image
              to close this view.
            </p>
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Zooming In & Out"
            title="Zooming In & Out"
          >
            <p>
              When viewing an image in full size, you can zoom in and out using
              <strong> Zoom In</strong> and <strong>Zoom Out</strong> buttons
              placed outside the modal on the top. Clicking
              <strong> Zoom In</strong> will increase the size of the image and
              the modal, while <strong>Zoom Out</strong> will decrease their
              sizes. Be mindful of your screen size when using the zoom
              features.
            </p>
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="Organizing Images"
            title="Organizing Images"
          >
            <p>
              The images can be reordered based on your preference. To do this,
              click and hold on an image you wish to move, then drag it to your
              desired location. Release the click to drop the image at that
              location.
            </p>
          </AccordionItem>
        </Accordion>
      </div>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-5">
        <Card className="py-4">
          <CardBody className="overflow-visible py-2">
            <div
              {...getRootProps({
                className:
                  "dropzone p-4 border-2 border-dashed rounded-lg border-gray-400 cursor-pointer",
              })}
            >
              <input {...getInputProps()} />
              <PhotoIcon className="w-24 h-24 text-gray-300 mx-auto" />
              <p className="text-center text-gray-500">
                Drag and drop some files here, or click to select files
              </p>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                  <aside
                    className="mt-4 grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-4 mx-auto"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {files.map((file, index) => (
                      <Draggable
                        key={file.name}
                        draggableId={file.name}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Badge
                              content={index + 1}
                              color="primary"
                              placement="top-left"
                              className="p-5"
                            >
                              <Card className="py-4">
                                <CardBody className="overflow-visible py-2">
                                  <Image
                                    alt="NextUI hero Image"
                                    className="w-64 h-64"
                                    src={URL.createObjectURL(file)}
                                    onClick={() => setPreviewImage(file.name)}
                                  />
                                  <Modal
                                    isOpen={previewImage === file.name}
                                    onOpenChange={() => setPreviewImage(null)}
                                    hideCloseButton
                                    size="xl"
                                  >
                                    <ModalContent className="p-0">
                                      {(onClose) => (
                                        <>
                                          <ModalBody className="p-0">
                                            <Image
                                              alt="NextUI hero Image"
                                              className="w-full"
                                              src={URL.createObjectURL(file)}
                                              style={{
                                                transform: `scale(${zoom})`,
                                              }}
                                            />
                                            <div className="flex justify-around z-20 mt-12">
                                              <Button
                                                onClick={() =>
                                                  setZoom((prevZoom) =>
                                                    Math.max(
                                                      0.1,
                                                      prevZoom - 0.1
                                                    )
                                                  )
                                                }
                                              >
                                                Zoom Out
                                              </Button>
                                              <Button
                                                onClick={() =>
                                                  setZoom(
                                                    (prevZoom) => prevZoom + 0.1
                                                  )
                                                }
                                              >
                                                Zoom In
                                              </Button>
                                            </div>
                                          </ModalBody>
                                        </>
                                      )}
                                    </ModalContent>
                                  </Modal>
                                </CardBody>
                              </Card>
                            </Badge>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </aside>
                )}
              </Droppable>
            </DragDropContext>
          </CardBody>
        </Card>
      </section>
    </>
  );
}
