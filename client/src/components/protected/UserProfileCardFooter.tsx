import { useContext } from "react";
import { AuthContext } from "@/context/userContext";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
const UserProfileCardFooter = ({ userId }: { userId: string }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const onClickViewListingButton = () => navigate(`/getuserlisting/${userId}`);
  const onClickUpdateProfileButton = () => navigate(`/updateprofile/${userId}`);
  return (
    <div className="flex w-[100%] flex-col md:flex-row justify-between items-center flex-grow gap-2">
      <Button
        className="w-[100%] md:w-[50%] bg-green-500 text-black hover:bg-green-700 flex-grow"
        onClick={onClickViewListingButton}
      >
        View Listings
      </Button>
      {user.id === userId && (
        <Button
          className="w-[100%] md:w-[50%] bg-orange-500 hover:bg-orange-700"
          onClick={onClickUpdateProfileButton}
        >
          Update Profile
        </Button>
      )}
    </div>
  );
};

export default UserProfileCardFooter;
