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
import { useDisclosure } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
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
              Drag n drop some files here, or click to select files
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
                                >
                                  <ModalContent className="p-0">
                                    {(onClose) => (
                                      <>
                                        <ModalBody className="p-0">
                                          <Image
                                            alt="NextUI hero Image"
                                            className="w-full"
                                            src={URL.createObjectURL(file)}
                                            onClick={() =>
                                              setPreviewImage(file.name)
                                            }
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
        </CardBody>
      </Card>
    </section>
  );
}
