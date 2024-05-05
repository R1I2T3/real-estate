import { useNavigate, useParams } from "react-router-dom";
import Spinner from "@/components/spinner";
import { toast } from "sonner";
import { useGetUserProfileInfoQuery } from "@/lib/api/user";
import { Card } from "@/components/ui/card";
import { ConvertDateFormat } from "@/utils";
import UserProfileCardFooter from "@/components/protected/UserProfileCardFooter";
import GetProfileCardSection from "../../components/protected/GetProfileCardSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GetProfile = () => {
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
  console.log(data);
  return (
    <div className="flex justify-center items-center min-h-[75dvh]">
      <Card className="w-[90%] md:w-[40%] flex flex-col gap-3 justify-center  border-slate-300 p-4">
        <div className="w-[100%]  rounded-full flex justify-center">
          <Avatar className="w-[100px] h-[100px] m-auto">
            <AvatarImage
              src={data?.user.avatar || "/defaultPic.png"}
              // className="w-[200px] h-[200px]"
            />
            <AvatarFallback>PF</AvatarFallback>
          </Avatar>
        </div>
        <GetProfileCardSection Attribute="Email" value={data?.user.email} />
        <GetProfileCardSection
          Attribute="Username"
          value={data?.user.username}
        />
        <section className="flex justify-start gap-5 items-center bg-slate-100 p-3 rounded-md">
          <h3 className="text-md md:text-xl font-semibold font-serif antialiased">
            Account created:{" "}
          </h3>
          <h4 className="text-md md:text-lg font-light subpixel-antialiased">
            {ConvertDateFormat(data.user.createdAt)}
          </h4>
        </section>
        <UserProfileCardFooter userId={data.user.id} />
      </Card>
    </div>
  );
};

export default GetProfile;
