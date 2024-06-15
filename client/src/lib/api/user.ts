import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const query = useInfiniteQuery({
    queryKey: ["UserListing", id],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const response = await fetch(
          `/api/user/getlisting?id=${id}&skip=${pageParam}`
        );
        console.log(id);

        const data = await response.json();
        if (data.error) {
          return { NoListingError: "There is No Listing" };
        }
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
