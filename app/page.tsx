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

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

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
                  className="mt-4 grid grid-cols-4 gap-4"
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
                                />
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
