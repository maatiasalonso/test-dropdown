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
import {
  PhotoIcon,
  TrashIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
} from "@heroicons/react/24/outline";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/button";
import Information from "@/components/information";

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

  const removeFile = (name: string) => {
    setFiles(files.filter((file) => file.name !== name));
  };

  return (
    <>
      <Information />

      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-5 sm:px-12">
        <Card className="py-4 w-full">
          <CardBody className="overflow-visible py-2">
            <div
              {...getRootProps({
                className:
                  "dropzone p-4 border-2 border-dashed rounded-lg border-gray-400 cursor-pointer h-64 my-auto flex flex-col items-center justify-center",
              })}
            >
              <input {...getInputProps()} />
              <PhotoIcon className="w-24 h-24 text-gray-300 mx-auto" />
              <p className="text-center text-gray-500">
                Drag and drop some files here, or click to select files
              </p>
            </div>
            <div className="sm:hidden mx-auto">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
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
                                <Button
                                  onClick={() => removeFile(file.name)}
                                  color="danger"
                                  isIconOnly
                                  className="rounded-full w-5 absolute z-20 top-0 right-0 -mt-1 -mr-1"
                                >
                                  <TrashIcon className="w-4 h-4" />
                                </Button>
                                <Card className="py-4 relative">
                                  <CardBody className="overflow-visible py-2">
                                    <Image
                                      alt="NextUI hero Image"
                                      className="w-64 h-64"
                                      src={URL.createObjectURL(file)}
                                      onClick={() => setPreviewImage(file.name)}
                                    />
                                    <Modal
                                      isOpen={previewImage === file.name}
                                      onOpenChange={() => {
                                        setPreviewImage(null);
                                        setZoom(1);
                                      }}
                                      hideCloseButton
                                      size="xl"
                                      scrollBehavior="inside"
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
            </div>
            <div className="hidden sm:block">
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
                                <Button
                                  onClick={() => removeFile(file.name)}
                                  color="danger"
                                  isIconOnly
                                  className="rounded-full w-5 absolute z-20 top-0 right-0 -mt-1 -mr-1"
                                >
                                  <TrashIcon className="w-4 h-4" />
                                </Button>
                                <Card className="py-4 relative">
                                  <CardBody className="overflow-visible py-2">
                                    <Image
                                      alt="NextUI hero Image"
                                      className="w-64 h-64"
                                      src={URL.createObjectURL(file)}
                                      onClick={() => setPreviewImage(file.name)}
                                    />
                                    <Modal
                                      isOpen={previewImage === file.name}
                                      onOpenChange={() => {
                                        setPreviewImage(null);
                                        setZoom(1);
                                      }}
                                      hideCloseButton
                                      size="xl"
                                      scrollBehavior="inside"
                                    >
                                      <ModalContent className="p-0 relative">
                                        {(onClose: any) => (
                                          <>
                                            <div className="flex justify-around w-full z-50 absolute -mt-16">
                                              <Button
                                                endContent={
                                                  <MagnifyingGlassMinusIcon className="w-5 h-5" />
                                                }
                                                color="primary"
                                                className="text-white"
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
                                                endContent={
                                                  <MagnifyingGlassPlusIcon className="w-5 h-5" />
                                                }
                                                color="primary"
                                                className="text-white"
                                                onClick={() =>
                                                  setZoom(
                                                    (prevZoom) => prevZoom + 0.1
                                                  )
                                                }
                                              >
                                                Zoom In
                                              </Button>
                                            </div>
                                            <ModalBody className="p-0">
                                              <Image
                                                alt="NextUI hero Image"
                                                className="w-full"
                                                src={URL.createObjectURL(file)}
                                                style={{
                                                  transform: `scale(${zoom})`,
                                                }}
                                              />
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
            </div>
          </CardBody>
        </Card>
      </section>
    </>
  );
}
