import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { number } from "zod";
export const useGetUserProfileInfoQuery = (id: string) => {
  const query = useQuery({
    queryKey: ["User Profile", id],
    queryFn: async () => {
      const response = await fetch(`/api/user/${id}`);
      return await response.json();
    },
    staleTime: 5 * 1000,
  });
  return query;
};

export const useUpdateProfileMutation = (id: string) => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/user/update", {
        method: "PUT",
        body: data,
      });
      return await response.json();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Unexpected server side error Happened");
      navigate(`/getprofile/${id}`, {
        replace: true,
      });
    },
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Profile Update successfully");
      }
      localStorage.setItem("real-estate-user", JSON.stringify(data.data));
      navigate(`/getprofile/${id}`, {
        replace: true,
      });
    },
  });
  return mutation;
};

export const useGetUserListingQuery = (id: { id: string }) => {
  try {
    const query = useInfiniteQuery({
      queryKey: ["listing", id],
      queryFn: async ({ pageParam }: number) => {
        const response = await fetch(``);
      },
    });
    return query;
  } catch (error) {
    console.log(error);
  }
};
