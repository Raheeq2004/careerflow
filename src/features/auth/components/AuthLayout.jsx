import Logo from "../../../components/UI/Logo";
import AuthSidePanel from "./AuthSidePanel";

function AuthLayout({
  children,
  title = "Your whole job search, in one calm place",
  description = "Track applications, plan interviews and see your progress. Free, and your data stays on your device.",
  bannerTitle = "Free, and private by design",
  bannerText = "Your data stays on your device.",
}) {
  return (
    <div className="min-h-screen font-sans text-ink lg:grid lg:grid-cols-2">
      <AuthSidePanel title={title} description={description} />

      <main className="flex items-center justify-center bg-white px-4 py-10 sm:px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo href="/" />
            <div className="mt-4 rounded-card bg-brand-gradient px-4 py-3 text-white">
              <p className="text-sm font-semibold">{bannerTitle}</p>
              <p className="text-xs text-white/80">{bannerText}</p>
            </div>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
//The = "..." part means “if nobody sends me a title, use this one”.