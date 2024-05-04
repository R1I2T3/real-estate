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
import { ProcessDataForFormUpdate } from "@/utils";
interface ListingFormProps {
  InputFormData?: getListingFormData;
  zodSchema: Schema;
  mutationFunction: (formdata: any) => any;
  isUpdate?: boolean;
}
const ListingForm = ({
  zodSchema,
  mutationFunction,
  InputFormData,
  isUpdate = false,
}: ListingFormProps) => {
  const [image, setImage] = useState<File>();
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      name: InputFormData?.name || "",
      address: InputFormData?.address || "",
      description: InputFormData?.description || "",
      regularPrice: InputFormData?.regularPrice?.toString() || "",
      discountPrice: InputFormData?.discountPrice?.toString() || "",
      bedrooms: InputFormData?.bedrooms?.toString() || "",
      bathrooms: InputFormData?.bathrooms?.toString() || "",
      parking: (InputFormData?.parking ? "Yes" : "No") || "No",
      offer: (InputFormData?.offer ? "Yes" : "No") || "No",
      furnished: (InputFormData?.furnished ? "Yes" : "No") || "No",
      type: InputFormData?.type || "Colonial",
    },
  });
  const onSubmit = async (values: z.infer<typeof zodSchema>) => {
    try {
      const formData = new FormData();
      const processedData = ProcessDataForFormUpdate(
        InputFormData,
        values,
        isUpdate
      );
      console.log(processedData);
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
        className="flex justify-between flex-col lg:flex-row gap-3 mb-3 items-center "
      >
        <Card className="w-[99%]  md:w-[80%] lg:w-[55%] p-3 space-y-6  flex flex-col justify-center ">
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
                  type="text"
                />
              </div>
              <div className="w-[47%]">
                <CustomInput
                  Name="bathrooms"
                  placeholder="Enter the number of bathrooms"
                  type="text"
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
        <div className="w-[99%] h-[200px] md:w-[80%] md:h-[600px] lg:w-[40%] lg:h-[600px] flex flex-col  gap-4 mb-3">
          <ImageDragDrop
            imageSelectCallback={imageSelectCallback}
            imageUrl={InputFormData?.imageUrl}
            isUpdate
          />
          <Button className=" bg-orange-500 hover:bg-orange-800 ">
            {isUpdate ? "Update" : "Submit"}
          </Button>
          {isUpdate ? (
            <Button className="bg-red-500 hover:bg-red-800 ">Cancel</Button>
          ) : (
            ""
          )}
        </div>
      </form>
    </Form>
  );
};

export default ListingForm;
