import { useToast } from "@/components/ui/use-toast";
import { LoginSchema, SignUpSchema } from "@/schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export const useSignUpMutation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof SignUpSchema>) => {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });
      return await response.json();
    },
    onError: () => {
      toast({ variant: "destructive", title: "Uh oh! Something went wrong." });
    },
    onSuccess: (data) => {
      localStorage.setItem("real-estate-user", JSON.stringify(data));
      if (data.error) {
        return toast({
          variant: "destructive",
          title: data.error,
        });
      }
      navigate("/");
    },
  });
  return mutation;
};

export const useLoginMutation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof LoginSchema>) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Some server side error taken Place",
      });
    },
    onSuccess: (data) => {
      if (data.error) {
        return toast({
          variant: "destructive",
          title: data.error,
        });
      }
      localStorage.setItem("real-estate-user", JSON.stringify(data));
      navigate("/", {
        replace: true,
      });
    },
  });
  return mutation;
};

export const useLogoutMutation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      });
      return await response.json();
    },
    onError: () => {
      toast({ variant: "destructive", title: "Uh oh! Something went wrong." });
    },
    onSuccess: (data) => {
      if (data.error) {
        return toast({
          variant: "destructive",
          title: data.error,
        });
      }
      localStorage.removeItem("real-estate-user");
      toast({ title: "User logged out successfully" });
      navigate("/auth/login");
    },
  });
  return mutation;
};
