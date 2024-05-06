import ListingCard from "@/components/protected/ListingCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetListingByTypeQuery } from "@/lib/api/listing";
import { getListingFormData } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const [type, setType] = useState<string | undefined>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSetParam = (key: string, value: string) => {
    setSearchParams({ ...searchParams, [key]: value });
  };
  const onSelectValueChange = (e: string) => {
    if (e === "all") {
      return setType("");
    }
    handleSetParam("q", e);
    return setType(e);
  };
  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useGetListingByTypeQuery(type);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, type]);
  return (
    <div className="m-10 flex flex-col gap-10">
      <Select defaultValue={""} onValueChange={onSelectValueChange}>
        <SelectTrigger className="w-[100%] md:w-[76%] lg:w-[50%]">
          <SelectValue placeholder="Select a house type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Housing</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Colonial">Colonial</SelectItem>
            <SelectItem value="Ranch">Ranch</SelectItem>
            <SelectItem value="Victorian">Victorian</SelectItem>
            <SelectItem value="Mid-century-Modern">
              Mid century Modern
            </SelectItem>
            <SelectItem value="Craftsman">Craftsman</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {status === "pending" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>{error.message}</div>
      ) : (
        <div className="flex flex-col gap-2">
          {data?.pages?.map((page) => {
            return (
              <div
                key={page?.currentPage}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-10"
              >
                {page?.data.Listings?.map((listing: getListingFormData) => {
                  return <ListingCard Listing={listing} key={listing.id} />;
                })}
              </div>
            );
          })}
          <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
        </div>
      )}
    </div>
  );
};

export default Home;
