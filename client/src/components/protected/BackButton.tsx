import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant={"link"}
      onClick={() => navigate(-1)}
      className="flex justify-start"
    >
      <ArrowBigLeft size={60} className="bg-slate-200" />
    </Button>
  );
};

export default BackButton;
