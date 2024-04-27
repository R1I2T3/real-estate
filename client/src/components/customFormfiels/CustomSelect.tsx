import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const CustomSelect = () => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type of housing</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select the type of housing" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Colonial">Colonial</SelectItem>
              <SelectItem value="Ranch">Ranch</SelectItem>
              <SelectItem value="Victorian">Victorian</SelectItem>
              <SelectItem value="Mid-century Modern">
                Mid-century Modern
              </SelectItem>
              <SelectItem value="Craftsman">Craftsman</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomSelect;
