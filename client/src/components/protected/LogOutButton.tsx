import { useLogoutMutation } from "@/lib/api/auth";
import { Button } from "../ui/button";

export const LogOutButton = () => {
  const { mutateAsync: LogoutMutate, isPending } = useLogoutMutation();
  if (isPending) {
    return <h1>Loading...</h1>;
  }
  const handleLogout = () => {
    LogoutMutate();
  };
  return (
    <form onClick={handleLogout}>
      <Button
        type="submit"
        variant={"link"}
        className={
          "bg-slate-200 w-full text-left p-5 md:p-3 font-light font-serif text-lg  hover:text-blue-800 hover:underline"
        }
      >
        Logout
      </Button>
    </form>
  );
};
