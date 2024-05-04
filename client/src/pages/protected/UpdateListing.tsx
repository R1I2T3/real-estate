import Spinner from "@/components/spinner";
import { toast } from "sonner";
import {
  useGetListingQuery,
  useUpdateListingMutation,
} from "@/lib/api/listing";
import { useParams } from "react-router-dom";
import { updateFormSchema } from "@/schema";
import ListingForm from "@/components/protected/ListingForm";
const UpdateListing = () => {
  const { id } = useParams();
  const {
    isPending: isDataFetchPending,
    isError,
    data,
  } = useGetListingQuery(id!);
  const {
    mutateAsync: updateListingMutation,
    isPending: isUpdateMutationPending,
  } = useUpdateListingMutation(id!);
  if (isDataFetchPending || isUpdateMutationPending) {
    return <Spinner />;
  }
  if (isError || data.error) {
    return toast.error(data.error || "Uh oh! Something went wrong.", {
      className: "bg-red-500",
    });
  }
  return (
    <div className="mx-10 my-10 ">
      <ListingForm
        zodSchema={updateFormSchema}
        mutationFunction={updateListingMutation}
        InputFormData={data}
        isUpdate={true}
      />
    </div>
  );
};

export default UpdateListing;
