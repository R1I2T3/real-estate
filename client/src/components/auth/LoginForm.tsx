import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useLoginMutation } from "@/lib/api/auth";
const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isPending, mutateAsync: LoginMutate } = useLoginMutation();
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    LoginMutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@gmail.com" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="12345678" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link
          to={"/auth/signup"}
          className="text-sm hover:text-blue-600 hover:underline"
        >
          <p className="text-right mt-3">Don't have account then signup</p>
        </Link>
        <Button
          className={`w-full py-3 ${isPending ? "bg-slate-700" : ""}`}
          type="submit"
          disabled={isPending}
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
