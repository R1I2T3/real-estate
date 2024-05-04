import { getListingFormData } from "@/types";
import GetListingCardInfoFooter from "./GetListingCardInfoFooter";
import { useContext } from "react";
import { AuthContext } from "@/context/userContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NavLink } from "react-router-dom";
interface GetListingCardInfoPropsType {
  data: getListingFormData;
}
const GetListingCardInfo = ({ data }: GetListingCardInfoPropsType) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col justify-start px-4 gap-2 md:w-[50%]">
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-2xl md:text-3xl font-semibold subpixel-antialiased">
          {data.name}
        </h1>
        <Avatar className=" w-[50px] h-[50px] md:w-[100px] md:h-[100px]">
          <NavLink to={`/getprofile/${user.id}`}>
            <AvatarImage src={user.imageUrl || "defaultPic.png"} />
          </NavLink>
          <AvatarFallback>PF</AvatarFallback>
        </Avatar>
      </div>
      <section className="gap-1">
        <h2 className="text-xl text-slate-600 font-semibold">Description</h2>
        <p className="text-justify text-slate-500 text-md font-light text-wrap">
          {data.description}
        </p>
      </section>
      <section>
        <h2 className="text-xl text-slate-600  font-semibold">Address</h2>
        <p className="text-justify text-slate-500 text-md font-light">
          {data.address}
        </p>
      </section>
      <section className="flex gap-4   items-center">
        <h4 className="text-xl text-slate-600  font-semibold">Price</h4>
        {data.discountPrice === 0 ? (
          <p className="text-justify text-slate-500 text-md font-light">
            {data.regularPrice}$
          </p>
        ) : (
          <h4 className="text-justify text-slate-500 text-md font-light">
            <span className="line-through">{data.regularPrice}</span>
            <p className="inline ml-3">{data.discountPrice}</p>$
          </h4>
        )}
      </section>
      <h1 className="text-xl text-slate-600  font-semibold">Additional info</h1>
      <div className="flex justify-between">
        <section className="flex gap-3 justify-start items-center">
          <h2 className="text-base text-slate-600  font-medium">Type</h2>
          <p className="text-base text-justify text-slate-500 text-md font-light">
            {data.type}
          </p>
        </section>
        <section className="flex gap-3 justify-start items-center">
          <h2 className="text-base text-slate-600  font-medium">
            Parking available
          </h2>
          <p className="text-base text-justify text-slate-500 text-md font-light">
            {data.parking ? "Yes" : "No"}
          </p>
        </section>
      </div>
      <div className="flex justify-between">
        <section className="flex gap-3 justify-start items-center">
          <h2 className="text-base text-slate-600  font-medium">Bathrooms</h2>
          <p className="text-base text-justify text-slate-500 text-md font-light">
            {data.bathrooms}
          </p>
        </section>
        <section className="flex gap-3 justify-start items-center">
          <h2 className="text-base text-slate-600  font-medium">Bedrooms</h2>
          <p className="text-base text-justify text-slate-500 text-md font-light">
            {data.bedrooms}
          </p>
        </section>
      </div>
      <div className="flex justify-between">
        <section className="flex gap-3 justify-start items-center">
          <h2 className="text-base text-slate-600  font-medium">Furnished</h2>
          <p className="text-base text-justify text-slate-500 text-md font-light">
            {data.furnished ? "Yes" : "No"}
          </p>
        </section>
        <section className="flex gap-3 justify-start items-center">
          <h2 className="text-base text-slate-600  font-medium">Offer</h2>
          <p className="text-base text-justify text-slate-500 text-md font-light">
            {data.offer ? "Yes" : "No"}
          </p>
        </section>
      </div>
      {user.id === data.userID ? (
        <GetListingCardInfoFooter ListingId={data.id} />
      ) : null}
    </div>
  );
};

export default GetListingCardInfo;
