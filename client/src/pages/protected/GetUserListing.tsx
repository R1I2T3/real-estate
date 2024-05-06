import ListingCard from "@/components/protected/ListingCard";
import { getListingFormData } from "@/types";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useGetUserListingQuery } from "@/lib/api/user";
import BackButton from "@/components/protected/BackButton";

const GetUserListing = () => {
  const { id } = useParams();
  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useGetUserListingQuery(id);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  console.log(data);
  if (data?.pages[0]?.NoListingError) {
    return (
      <h1 className="text-red-500 flex justify-center items-center min-h-[80vh] text-2xl">
        There is no Listing with this Id
      </h1>
    );
  }
  return status === "pending" ? (
    <div>Loading...</div>
  ) : status === "error" ? (
    <div>{error.message}</div>
  ) : (
    <div className="m-5 flex flex-col gap-5">
      <BackButton />
      {data.pages.map((page) => {
        return (
          <div
            key={page?.currentPage}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-10"
          >
            {page?.data?.Listings?.map((listing: getListingFormData) => {
              return <ListingCard Listing={listing} key={listing.id} />;
            })}
          </div>
        );
      })}
      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </div>
  );
};

export default GetUserListing;
