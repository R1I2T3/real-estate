import { Form } from "@/components/ui/form";
import CustomInput from "@/components/customFormFields/CustomInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "@/schema";
import { FormProvider, useForm } from "react-hook-form";
import UpdateProfileFooter from "@/components/protected/UpdateProfileFooter";
import { useState } from "react";
import ImageSelectUpdateProfile from "@/components/protected/ImageSelectUpdateProfile";
import { useUpdateProfileMutation } from "@/lib/api/user";
import Spinner from "../spinner";

const UpdateProfileForm = ({ data }: any) => {
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: data.user.username || "",
      password: "",
    },
  });
  const [image, setImage] = useState<File>();
  const imageSelectCallback = (File: File) => {
    setImage(File);
    return;
  };
  const { isPending, mutateAsync: updateProfileMutation } =
    useUpdateProfileMutation(data?.user.id);
  const onUpdate = async (values: z.infer<typeof updateProfileSchema>) => {
    const formData = new FormData();
    if (image && image instanceof File) {
      formData.append("avatar", image);
    }
    if (values.password) {
      formData.append("password", values.password);
    }
    if (values.username !== data.user.username) {
      formData.append("username", values.username as string);
    }
    await updateProfileMutation(formData);
  };
  if (isPending) {
    return <Spinner />;
  }
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onUpdate)}
      >
        <FormProvider {...form}>
          <ImageSelectUpdateProfile
            avatarUrl={data.user.avatar}
            imageSelectCallback={imageSelectCallback}
          />
          <CustomInput
            Name="username"
            placeholder="Enter your new username"
            type="text"
          />
          <CustomInput
            Name="password"
            placeholder="Enter your new Password"
            type="password"
          />
          <UpdateProfileFooter id={data.user.id} />
        </FormProvider>
      </form>
    </Form>
  );
};

export default UpdateProfileForm;
