import Spinner from "@/components/spinner";
import { toast } from "sonner";
import { useGetListingQuery } from "@/lib/api/listing";
import { useParams } from "react-router-dom";
const UpdateListing = () => {
  const { id } = useParams();
  const { isPending, isError, data } = useGetListingQuery(id!);
  if (isPending) {
    return <Spinner />;
  }
  if (isError || data.error) {
    return toast.error(data.error || "Uh oh! Something went wrong.", {
      className: "bg-red-500",
    });
  }
  return <div>{id}</div>;
};

export default UpdateListing;
