"use client";

import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function getCroppedImage(src: string, crop: any, zoom: number, aspect = 1) {
  return new Promise<Blob>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      const naturalWidth = img.width;
      const naturalHeight = img.height;

      const cropX = (crop.x / 100) * naturalWidth;
      const cropY = (crop.y / 100) * naturalHeight;
      const cropWidth = (crop.width / 100) * naturalWidth;
      const cropHeight = (crop.height / 100) * naturalHeight;

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      ctx.drawImage(
        img,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      canvas.toBlob((blob) => {
        if (!blob) reject(new Error("Canvas is empty"));
        else resolve(blob);
      }, "image/jpeg");
    };
  });
}

export default function CropProfileImageComponent({
  open,
  onClose,
  src,
  onCropped,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  onCropped: (file: File) => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleCrop = async () => {
    const croppedBlob = await getCroppedImage(src, crop, zoom);
    const file = new File([croppedBlob], "cropped.jpg", {
      type: "image/jpeg",
    });
    onCropped(file);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <div className="relative w-full h-80 bg-black/40 rounded-md overflow-hidden">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
          />
        </div>
        <DialogFooter className="mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCrop}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
