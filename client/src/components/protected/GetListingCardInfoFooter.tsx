import { Button } from "../ui/button";
import { CustomAlertDialog } from "../CustomAlterBox";
import { useNavigate } from "react-router-dom";
import { useDeleteListingMutation } from "@/lib/api/listing";
const GetListingCardInfoFooter = ({ ListingId }: { ListingId: string }) => {
  const navigate = useNavigate();
  const { mutateAsync: DeleteListing, isPending } = useDeleteListingMutation();
  const onDeleteListing = async () => {
    await DeleteListing(ListingId);
  };
  return (
    <div className="flex justify-between flex-col md:flex-row gap-3 mb-5">
      <CustomAlertDialog
        alertDialogDescription="This action cannot be undone.This listing will be permanently deleted"
        purpose="deleteListing"
        onClickFunction={onDeleteListing}
      >
        <Button
          className="bg-red-600 w-[100%] md:[40%] hover:bg-red-800 "
          disabled={isPending}
        >
          {isPending ? "Deleting..." : "Delete"}
        </Button>
      </CustomAlertDialog>
      <CustomAlertDialog
        alertDialogDescription="Are you sure you want to update this listing"
        purpose="UpdateListing"
        onClickFunction={() => {
          navigate(`/updatelisting/${ListingId}`);
        }}
      >
        <Button className="bg-orange-600 w-[100%] md:[40%] hover:bg-orange-800">
          Update Listing
        </Button>
      </CustomAlertDialog>
    </div>
  );
};

export default GetListingCardInfoFooter;
