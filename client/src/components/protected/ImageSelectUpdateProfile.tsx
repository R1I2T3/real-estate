import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface ImageSelectUpdateProfilePropsType {
  avatarUrl: string;
  imageSelectCallback: (file: File) => void;
}
const ImageSelectUpdateProfile = ({
  avatarUrl,
  imageSelectCallback,
}: ImageSelectUpdateProfilePropsType) => {
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
    <div {...getRootProps()} className="w-[30%] rounded-full m-auto">
      <input {...getInputProps()} />
      {previewImage ? (
        <Avatar>
          <AvatarImage src={previewImage} />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="w-[100px] h-[100px] m-auto">
          <AvatarImage src={avatarUrl || "/defaultPic.png"} />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ImageSelectUpdateProfile;
