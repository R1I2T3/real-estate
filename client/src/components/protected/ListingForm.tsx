import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Schema, z } from "zod";
import { Form } from "../ui/form";
import { Card } from "../ui/card";
import CustomInput from "../customFormFields/CustomInput";
import CustomRadioGroup from "../customFormFields/CustomRadioGroup";
import CustomSelect from "../customFormFields/CustomSelect";
import CustomText from "../customFormFields/CustomTextField";
import ImageDragDrop from "./ImageDragDrop";
import { Button } from "../ui/button";
import { useState } from "react";
import { getListingFormData } from "@/types";
interface ListingFormProps {
  InputFormData?: getListingFormData;
  zodSchema: Schema;
  mutationFunction: (formdata: any) => any;
}
const ListingForm = ({ zodSchema, mutationFunction }: ListingFormProps) => {
  const [image, setImage] = useState<File>();
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      name: "",
      address: "",
      description: "",
      regularPrice: "",
      discountPrice: "",
      bedrooms: "",
      bathrooms: "",
      parking: "No",
      offer: "No",
      furnished: "No",
      type: "Colonial",
    },
  });
  const onSubmit = async (values: z.infer<typeof zodSchema>) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        if (typeof value == "string") {
          formData.append(key, value);
        }
      }
      if (image instanceof File) {
        formData.append("image", image);
      }
      const result = await mutationFunction(formData);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const imageSelectCallback = (File: File) => {
    setImage(File);
    return;
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between flex-col md:flex-row gap-3"
      >
        <Card className="w-[99%]  md:w-[55%] p-3 space-y-6  flex flex-col justify-center">
          <FormProvider {...form}>
            <CustomInput
              Name="name"
              placeholder="Enter the name of property"
              type="text"
            />
            <CustomInput
              Name="address"
              placeholder="Enter the address of property"
              type="text"
            />
            <div className="flex justify-between">
              <div className="w-[47%]">
                <CustomInput
                  Name="regularPrice"
                  placeholder="Enter the price of property"
                  type="number"
                />
              </div>
              <div className="w-[47%]">
                <CustomInput
                  Name="discountPrice"
                  placeholder="Enter the discount price of property"
                  type="number"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-[47%]">
                <CustomInput
                  Name="bedrooms"
                  placeholder="Enter the number of bedrooms"
                  type="number"
                />
              </div>
              <div className="w-[47%]">
                <CustomInput
                  Name="bathrooms"
                  placeholder="Enter the number of bathrooms"
                  type="number"
                />
              </div>
            </div>
            <div className="flex justify-around">
              <CustomRadioGroup name="parking" />
              <CustomRadioGroup name="offer" />
              <CustomRadioGroup name="furnished" />
            </div>
            <CustomSelect />
            <CustomText
              Name="description"
              placeholder="Enter further description of property"
            />
          </FormProvider>
        </Card>
        <div className="w-[99%] h-[200px] md:w-[40%] md:h-[600px] flex flex-col gap-7 mb-3">
          <ImageDragDrop imageSelectCallback={imageSelectCallback} />
          <Button className="h-30 bg-orange-500 hover:bg-orange-800 ">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ListingForm;
