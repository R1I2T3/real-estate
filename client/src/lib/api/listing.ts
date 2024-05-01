import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

export const useGetListingQuery = (id: string) => {
  const data = useQuery({
    queryKey: ["UpdateListing", id],
    queryFn: async () => {
      const response = await fetch(`/api/listing/getlisting/${id}`);
      return await response.json();
    },
    staleTime: 5 * 1000,
  });
  return data;
};

export const useDeleteListingMutation = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(response);
      return await response.json();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Some server side error taken place");
      navigate("/", { replace: true });
    },
    onSuccess: (data) => {
      if (data.error) {
        return toast.error(data.error);
      }
      toast.success("Listing deleted successfully");
      navigate("/", {
        replace: true,
      });
    },
  });
  return mutation;
};
