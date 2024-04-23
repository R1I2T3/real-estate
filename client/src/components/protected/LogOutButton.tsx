import { useLogoutMutation } from "@/lib/api/auth";
import { Button } from "../ui/button";

export const LogOutButton = () => {
  const { mutateAsync: LogoutMutate, isPending } = useLogoutMutation();
  if (isPending) {
    return <h1>Loading...</h1>;
  }
  const handleLogout = (e: any) => {
    e.preventDefault();
    LogoutMutate();
  };
  return (
    <form onClick={handleLogout}>
      <Button type="submit">Logout</Button>
    </form>
  );
};
