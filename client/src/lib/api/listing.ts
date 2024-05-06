import { useToast } from "@/components/ui/use-toast";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
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

export const useUpdateListingMutation = (id: string) => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      console.log(data);
      const response = await fetch(`/api/listing/update/${id}`, {
        method: "PUT",
        body: data,
      });
      return await response.json();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Unexpected server side error Happened");
      navigate(-1);
    },
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Listing Updated successfully");
      }
      navigate(-1);
    },
  });
  return mutation;
};

export const useGetListingByTypeQuery = (type: { type?: string }) => {
  const query = useInfiniteQuery({
    queryKey: ["listings", type],
    queryFn: async ({ pageParam = 0 }: { pageParam: number }) => {
      try {
        let response;
        if (!type) {
          response = await fetch(`/api/listing/getlisting?skip=${pageParam}`);
        } else {
          response = await fetch(
            `/api/listing/getlisting?q=${type}&skip=${pageParam}`
          );
        }
        const data = await response.json();
        return {
          data,
          currentPage: pageParam,
        };
      } catch (error) {
        console.log(error);
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage?.data?.Listings?.length === 6
          ? allPages?.length > 0
            ? allPages[allPages?.length - 1].currentPage + 1
            : 2
          : undefined;
      return nextPage;
    },
  });
  return query;
};
