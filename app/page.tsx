"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, Badge, Card, CardBody, Tooltip } from "@nextui-org/react";
import { Information } from "@/components/information";
import { ImageCard } from "@/components/image-card";

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

  const removeFile = (name: string) => {
    setFiles(files.filter((file) => file.name !== name));
  };

  return (
    <>
      <Information />

      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-5 sm:px-14 px-2">
        <Card className="py-4 w-full hover:bg-zinc-100 dark:hover:bg-zinc-800/90">
          <CardBody className="overflow-visible py-2">
            <div
              {...getRootProps({
                className:
                  "dropzone p-4 border-2 border-dashed rounded-lg border-zinc-500 cursor-pointer h-64 my-auto flex flex-col items-center justify-center",
              })}
            >
              <input {...getInputProps()} />
              <PhotoIcon className="w-24 h-24 text-zinc-500 mx-auto" />
              <p className="text-center text-zinc-500">
                Drag and drop some files here, or click to select files
              </p>
            </div>
          </CardBody>
        </Card>
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
                            <ImageCard file={file} />
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
                  className="mt-6 grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-4 mx-auto"
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
                            className="p-5 top-0 left-0 -mt-2 -ml-2"
                          >
                            <Tooltip
                              placement="top"
                              showArrow
                              content="Remove"
                              closeDelay={100}
                              color="danger"
                            >
                              <Button
                                onClick={() => removeFile(file.name)}
                                color="danger"
                                isIconOnly
                                className="rounded-full w-5 absolute z-20 top-0 right-0 -mt-3 -mr-3 hover:scale-110 transition-all"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            </Tooltip>
                            <ImageCard file={file} />
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
      </section>
    </>
  );
}
