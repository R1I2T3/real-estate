import ListingForm from "@/components/protected/ListingForm";
import Spinner from "@/components/spinner";
import { useCreateListingMutation } from "@/lib/api/listing";
import { createListingSchema } from "@/schema";
const CreateListing = () => {
  const { isPending, mutateAsync: createListingMutate } =
    useCreateListingMutation();
  if (isPending) {
    return <Spinner />;
  }
  return (
    <div className="mx-10 my-10">
      <ListingForm
        zodSchema={createListingSchema}
        mutationFunction={createListingMutate}
      />
    </div>
  );
};

export default CreateListing;
