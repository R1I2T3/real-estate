import { createListingSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { Card } from "../ui/card";
import CustomInput from "../customFormfiels/CustomInput";
import CustomRadioGroup from "../customFormfiels/CustomRadioGroup";
import CustomSelect from "../customFormfiels/CustomSelect";
import CustomText from "../customFormfiels/CustomTextField";
const ListingForm = () => {
  const form = useForm<z.infer<typeof createListingSchema>>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      name: "",
      address: "",
      description: "",
      regularPrice: 0,
      discountPrice: 0,
      bedrooms: 0,
      bathrooms: 0,
      parking: "No",
      offer: "No",
      furnished: "No",
      type: "Colonial",
    },
  });
  const onSubmit = (values: z.infer<typeof createListingSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between"
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
      </form>
    </Form>
  );
};

export default ListingForm;
