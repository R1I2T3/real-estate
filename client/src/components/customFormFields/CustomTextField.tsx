import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";
interface CustomInputProps {
  Name: string;
  placeholder: string;
}
const CustomText = ({ Name, placeholder }: CustomInputProps) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={Name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {Name.slice(0, 1).toUpperCase() + Name.slice(1)}
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder={placeholder}
              {...form.register(Name)}
              className="w-[100%]"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomText;
