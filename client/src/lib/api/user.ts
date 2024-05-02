import { useQuery } from "@tanstack/react-query";

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
