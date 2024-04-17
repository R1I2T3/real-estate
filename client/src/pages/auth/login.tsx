import { CardContent, CardHeader } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
const Login = () => {
  return (
    <div className="w-full">
      <CardHeader className="text-3xl font-sans text-center  font-semibold">
        Login
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </div>
  );
};

export default Login;
