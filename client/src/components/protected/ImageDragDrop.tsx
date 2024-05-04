import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
interface ImageDragAndDropProps {
  imageSelectCallback: (file: File) => void;
  isUpdate?: boolean;
  imageUrl?: string;
}
const ImageDragDrop = ({
  imageSelectCallback,
  isUpdate = false,
  imageUrl = "",
}: ImageDragAndDropProps) => {
  const [previewImage, setPreviewImage] = useState(null);
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        imageSelectCallback(file);
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    [imageSelectCallback]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className="w-[100%] h-[200px] md:w-[100%] md:h-[100%]  flex justify-center items-center bg-slate-200 my-10 lg:my-0"
    >
      <input {...getInputProps()} />
      {previewImage ? (
        <img
          src={previewImage}
          alt="This is image"
          className="w-[100%] h-[200px] md:h-[100%] lg:h-[100%] lg:w-[100%]"
        />
      ) : isUpdate ? (
        <img src={imageUrl} alt="This is placeholder for an image" />
      ) : (
        <p>Drag n' drop some or select image</p>
      )}
    </div>
  );
};

export default ImageDragDrop;
