import { SignUp } from "@clerk/clerk-react";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary",
            card: "shadow-none",
            headerTitle: "Create your account",
            headerSubtitle: "Get started with group buying",
            socialButtonsBlockButton: "bg-white border-2 border-stone-200",
            formFieldInput: "border-2 border-stone-200",
            footerActionLink: "text-primary hover:text-primary-dark"
          }
        }}
      />
    </div>
  );
};

export default Signup;