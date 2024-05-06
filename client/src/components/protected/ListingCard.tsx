import { NavLink } from "react-router-dom";
import { Card } from "../ui/card";
import { getListingFormData } from "@/types";
interface ListingCardPropsTypes {
  Listing: getListingFormData;
}
const ListingCard = ({ Listing }: ListingCardPropsTypes) => {
  return (
    <Card className="p-5 flex flex-col gap-4 justify-center  rounded-xl lg:w-[450px] lg:h-[390px] ">
      <img
        src={Listing.imageUrl}
        alt=""
        className="rounded-xl h-[200px] w-[300px] m-auto md:h-[250px] md:w-[350px] lg:h-[300px] lg:w-[400px]"
      />
      <div className="flex justify-between gap-2">
        <NavLink
          to={`/getlisting/${Listing.id}`}
          className={
            "bg-green-500 hover:bg-green-800 p-3 rounded-lg  text-[13px]  lg:text-md font-semibold"
          }
        >
          View Listing
        </NavLink>
        <NavLink
          to={`/getProfile/${Listing.userID}`}
          className={
            "bg-orange-500 hover:bg-orange-700 p-3 rounded-lg text-[13px]  lg:text-md font-semibold"
          }
        >
          View Creator Profile
        </NavLink>
      </div>
    </Card>
  );
};

export default ListingCard;
