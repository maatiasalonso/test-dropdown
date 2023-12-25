"use client";
import {
  Button,
  Card,
  CardBody,
  Image,
  Modal,
  ModalBody,
  ModalContent,
} from "@nextui-org/react";
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface ImageCardProps {
  file: any;
}

export const ImageCard = ({ file }: ImageCardProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  return (
    <section className="hover:opacity-50 transition-all dark:hover:opacity-40">
      <Card>
        <CardBody className="overflow-visible p-0">
          <Image
            removeWrapper
            alt="Image Uploaded"
            className="w-64 h-64 object-cover"
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
            placement="center"
            scrollBehavior="inside"
            className="w-auto"
          >
            <ModalContent className="p-0">
              {(onClose) => (
                <>
                  <div className="hidden sm:flex justify-around w-full z-50 absolute -mt-16">
                    <Button
                      endContent={
                        <MagnifyingGlassMinusIcon className="w-5 h-5" />
                      }
                      color="primary"
                      className="text-white hover:bg-primary/90 transition-all"
                      onClick={() =>
                        setZoom((prevZoom) => Math.max(0.1, prevZoom - 0.1))
                      }
                    >
                      Zoom Out
                    </Button>
                    <Button
                      endContent={
                        <MagnifyingGlassPlusIcon className="w-5 h-5" />
                      }
                      color="primary"
                      className="text-white hover:bg-primary/90 transition-all"
                      onClick={() => setZoom((prevZoom) => prevZoom + 0.1)}
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
    </section>
  );
};
