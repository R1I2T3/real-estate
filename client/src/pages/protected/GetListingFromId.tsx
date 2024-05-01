import { useNavigate, useParams } from "react-router-dom";
import Spinner from "@/components/spinner";
import { useGetListingQuery } from "@/lib/api/listing";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import GetListingCardInfo from "@/components/protected/GetListingCardInfo";
const GetListingFromId = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isPending, isError, data } = useGetListingQuery(id!);
  if (isPending) {
    return <Spinner />;
  }
  if (isError || data.error) {
    toast.error(data.error || "Uh oh! Something went wrong.", {
      action: {
        label: "Go to home",
        onClick: () => {
          navigate("/", {
            replace: true,
          });
        },
      },
    });
    return (
      <h1 className="text-red-500 h-[100dvh] flex justify-center items-center text-2xl md:text-3xl">
        No listing is there with this Id
      </h1>
    );
  }
  return (
    <div className="w-[100%] md:h-[100dvh]  flex justify-center items-center ">
      <Card className="w-[90%] md:w-[80%] py-4 flex flex-col-reverse md:flex-row md:justify-around justify-between items-center">
        <GetListingCardInfo data={data} />
        <img
          src={data.imageUrl}
          alt="This is image of the listing"
          className="w-[80%] md:w-[40%] h-[40%] md:h-[30%] py-10 rounded-md px-4"
        />
      </Card>
    </div>
  );
};

export default GetListingFromId;
