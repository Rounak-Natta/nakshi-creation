"use client";

import Image from "next/image";

import {
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  ImageIcon,
  Loader2,
  Star,
  Trash2,
  Upload,
} from "lucide-react";

interface ProductImage {
  id: string;

  url: string;

  alt: string | null;

  isPrimary: boolean;

  position: number;
}

interface Props {
  productId: string;

  images: ProductImage[];
}

const MAX_IMAGES = 5;

export default function ProductImages({
  productId,
  images,
}: Props) {
  const router = useRouter();

  const inputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  const [processingId, setProcessingId] =
    useState<string | null>(null);

  async function handleUpload(
    files: FileList | null
  ) {
    if (!files?.length) {
      return;
    }

    try {
      setUploading(true);

      const formData =
        new FormData();

      Array.from(files).forEach(
        (file) => {
          formData.append(
            "images",
            file
          );
        }
      );

      const response =
        await fetch(
          `/api/products/${productId}/images`,
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ??
            "Failed to upload images"
        );

        return;
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to upload images"
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(
    imageId: string
  ) {
    const confirmed =
      window.confirm(
        "Delete this image?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setProcessingId(imageId);

      const response =
        await fetch(
          `/api/products/images/${imageId}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ??
            "Failed to delete image"
        );

        return;
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete image"
      );
    } finally {
      setProcessingId(null);
    }
  }

  async function handlePrimary(
    imageId: string
  ) {
    try {
      setProcessingId(imageId);

      const response =
        await fetch(
          `/api/products/images/${imageId}/primary`,
          {
            method: "PATCH",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ??
            "Failed to update image"
        );

        return;
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update image"
      );
    } finally {
      setProcessingId(null);
    }
  }

  const remainingSlots =
    MAX_IMAGES -
    images.length;

  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-sm
        ring-1
        ring-zinc-200/60
      "
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        accept="image/png,image/jpeg,image/webp"
        onChange={(e) =>
          handleUpload(
            e.target.files
          )
        }
      />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Product Images
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            {images.length}/{MAX_IMAGES}
            {" "}
            images uploaded
          </p>
        </div>

        <button
          type="button"
          disabled={
            uploading ||
            remainingSlots === 0
          }
          onClick={() =>
            inputRef.current?.click()
          }
          className="
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-accent
            px-4
            py-3
            font-medium
            text-white
            transition
            hover:opacity-90
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {uploading ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <Upload size={18} />
          )}

          Upload Images
        </button>
      </div>

      {images.length === 0 ? (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            rounded-3xl
            border-2
            border-dashed
            border-zinc-200
            py-16
          "
        >
          <ImageIcon
            size={48}
            className="mb-4 text-zinc-400"
          />

          <h3 className="font-medium">
            No Images Uploaded
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Upload up to 5 product
            images
          </p>
        </div>
      ) : (
        <div
          className="
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-5
          "
        >
          {images.map(
            (image) => (
              <div
                key={image.id}
                className="
                  overflow-hidden
                  rounded-3xl
                  border
                  border-zinc-200
                "
              >
                <div
                  className="
                    relative
                    aspect-square
                    bg-zinc-100
                  "
                >
                  <Image
                    src={image.url}
                    alt={
                      image.alt ??
                      "Product Image"
                    }
                    fill
                    className="object-cover"
                  />

                  {image.isPrimary && (
                    <div
                      className="
                        absolute
                        left-3
                        top-3
                        rounded-full
                        bg-green-600
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-white
                      "
                    >
                      Primary
                    </div>
                  )}
                </div>

                <div className="space-y-2 p-3">
                  <button
                    type="button"
                    disabled={
                      processingId ===
                      image.id
                    }
                    onClick={() =>
                      handlePrimary(
                        image.id
                      )
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-zinc-100
                      py-2
                      text-sm
                      font-medium
                    "
                  >
                    <Star size={16} />

                    Set Primary
                  </button>

                  <button
                    type="button"
                    disabled={
                      processingId ===
                      image.id
                    }
                    onClick={() =>
                      handleDelete(
                        image.id
                      )
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-red-50
                      py-2
                      text-sm
                      font-medium
                      text-red-600
                    "
                  >
                    <Trash2 size={16} />

                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
