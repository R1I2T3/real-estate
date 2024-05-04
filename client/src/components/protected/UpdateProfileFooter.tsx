import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const UpdateProfileFooter = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const onClickUpdateButton = () =>
    navigate(`/getprofile/${id}`, { replace: true });
  return (
    <section className="flex flex-col-reverse md:flex-row gap-2">
      <Button
        className="md:w-[50%] bg-red-600 hover:bg-red-700"
        onClick={onClickUpdateButton}
        type="button"
      >
        Cancel
      </Button>
      <Button
        className="md:w-[50%] bg-green-600 hover:bg-green-700"
        type="submit"
      >
        Update
      </Button>
    </section>
  );
};

export default UpdateProfileFooter;
