import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetUserProfileInfoQuery } from "@/lib/api/user";
import Spinner from "@/components/spinner";
import { toast } from "sonner";
import UpdateProfileForm from "@/components/protected/UpdateProfileForm";

const UpdateProfile = () => {
  const { id } = useParams();
  const { isPending, isError, data } = useGetUserProfileInfoQuery(id!);
  const navigate = useNavigate();

  if (isPending) {
    return <Spinner />;
  }
  if (isError || data.error) {
    toast(data.error || "Some server side error happened", {
      action: {
        label: "Go to home",
        onClick: () => {
          navigate("/");
        },
      },
    });
    return (
      <h1 className="h-[100dvh] flex justify-center items-center text-red-700 font-semibold text-3xl">
        {data.error || "some server side error happened"}
      </h1>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[75dvh]">
      <Card className="flex flex-col w-[90%] md:w-[40%] justify-center gap-3 px-4 py-7">
        <UpdateProfileForm data={data} />
      </Card>
    </div>
  );
};

export default UpdateProfile;
