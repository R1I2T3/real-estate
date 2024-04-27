import ListingForm from "@/components/protected/ListingForm";
import { createListingSchema } from "@/schema";
const CreateListing = () => {
  return (
    <div className="mx-10 my-10">
      <ListingForm zodSchema={createListingSchema} />
    </div>
  );
};

export default CreateListing;
