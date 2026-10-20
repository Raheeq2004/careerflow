import Logo from "../../../components/UI/Logo";
import AuthSidePanel from "./AuthSidePanel";
//Role: the page shell, shared by Signup and Login.
function AuthLayout({ children }) {
  return (
    <div className="min-h-screen font-sans text-ink lg:grid lg:grid-cols-2">
      <AuthSidePanel />

      <main className="flex items-center justify-center bg-white px-4 py-10 sm:px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo href="/" />
            <div className="mt-4 rounded-card bg-brand-gradient px-4 py-3 text-white">
              <p className="text-sm font-semibold">
                Free, and private by design
              </p>
              <p className="text-xs text-white/80">
                Your data stays on your device.
              </p>
            </div>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
