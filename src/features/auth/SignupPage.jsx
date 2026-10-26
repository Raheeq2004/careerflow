import { Link } from "react-router";
import AuthLayout from "./components/AuthLayout";
import SignupForm from "./components/SignupForm";

function SignupPage() {
  return (
    <AuthLayout>
      <h1 className="font-heading text-h3 font-bold text-navy">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-muted">
        Start tracking your applications in under a minute
      </p>
        
      <div className="mt-8">
        <SignupForm />
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-brand hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>//no data is sent , so its the defula 
  );
}

export default SignupPage;
//h1 , p1 : props from  signup login to layout