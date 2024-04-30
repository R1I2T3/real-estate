import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
interface ImageDragAndDropProps {
  imageSelectCallback: (file: File) => void;
}
const ImageDragDrop = ({ imageSelectCallback }: ImageDragAndDropProps) => {
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
      className="w-[100%] h-full flex justify-center items-center  bg-slate-100"
    >
      <input {...getInputProps()} />
      {previewImage ? (
        <img src={previewImage} alt="This is image" />
      ) : (
        <p>Drag ' drop some or select image</p>
      )}
    </div>
  );
};

export default ImageDragDrop;
