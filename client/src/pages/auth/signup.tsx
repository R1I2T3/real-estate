import { CardContent, CardHeader } from "@/components/ui/card";
import SignUpForm from "@/components/auth/SIgnUpForm";
const SignUp = () => {
  return (
    <div className="w-full">
      <CardHeader className="text-3xl font-sans text-center  font-semibold">
        SignUp
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </div>
  );
};

export default SignUp;
