import { Link } from "react-router";
import AuthLayout from "./components/AuthLayout";
import LoginForm from "./components/LoginForm";

function LoginPage() {
  return (
    <AuthLayout
      title="Pick up your job search where you left off"
      description="Your applications, interviews and progress are waiting for you."
      bannerTitle="Your applications are waiting"
      bannerText="Your data stays on your device."
    >
      <h1 className="font-heading text-h3 font-bold text-navy">Welcome back</h1>
      <p className="mt-2 text-sm text-muted">
        Log in to see your applications and upcoming interviews.
      </p>

      <div className="mt-8">
        <LoginForm />
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        New to CareerFlow?{" "}
        <Link to="/signup" className="font-semibold text-brand hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthLayout>// while in the loogin page we send data , to change the defualt
  );
}

export default LoginPage;
