import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
interface CustomInputProps {
  Name: string;
  placeholder: string;
  type: string;
}
const CustomInput = ({ Name, placeholder, type }: CustomInputProps) => {
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
            <Input
              {...field}
              type={type}
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

export default CustomInput;
