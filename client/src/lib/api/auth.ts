import { toast } from "sonner";
import { LoginSchema, SignUpSchema } from "@/schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export const useSignUpMutation = () => {
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
      toast("Uh oh! Something went wrong.");
    },
    onSuccess: (data) => {
      localStorage.setItem("real-estate-user", JSON.stringify(data));
      if (data.error) {
        return toast(data.error);
      }
      navigate("/", { replace: true });
    },
  });
  return mutation;
};

export const useLoginMutation = () => {
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
      toast("Some server side error taken Place");
    },
    onSuccess: (data) => {
      if (data.error) {
        return toast(data.error);
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
      toast.error("Uh oh! Something went wrong.");
    },
    onSuccess: (data) => {
      if (data.error) {
        return toast.error(data.error);
      }
      localStorage.removeItem("real-estate-user");
      toast.success("User logged out successfully");
      navigate("/auth/login");
    },
  });
  return mutation;
};
