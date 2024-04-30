import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useCreateListingMutation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/listing/create", {
        method: "POST",
        body: data,
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
      navigate("/");
    },
  });
  return mutation;
};
