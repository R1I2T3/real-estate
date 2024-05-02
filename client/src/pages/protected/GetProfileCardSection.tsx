const GetProfileCardSection = ({
  Attribute,
  value,
}: {
  Attribute: string;
  value: string;
}) => {
  return (
    <section className="flex justify-start gap-5 items-center bg-slate-100 p-3 rounded-md">
      <h3 className="text-xl font-semibold font-serif antialiased">
        {Attribute}:{" "}
      </h3>
      <h4 className="text-lg font-light subpixel-antialiased">{value}</h4>
    </section>
  );
};

export default GetProfileCardSection;
