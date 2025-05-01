// import { SignIn, useClerk } from "@clerk/clerk-react";
// import { useLocation } from "react-router-dom";

// const Login = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const redirectUrl = searchParams.get('redirect_url');

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <SignIn 
//         routing="path" 
//         path="/login" 
//         signUpUrl="/signup"
//         redirectUrl={redirectUrl || "/start-saving"}
//         afterSignInUrl="/start-saving"
//       />
//     </div>
//   );
// };

// export default Login;
// import { SignIn } from "@clerk/clerk-react";
// import { useLocation } from "react-router-dom";

// const Login = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const redirectUrl = searchParams.get('redirect_url');

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background p-4">
//       <SignIn
//         routing="path"
//         path="/login"
//         signUpUrl="/signup"
//         redirectUrl={redirectUrl || "/dashboard"}
//         afterSignInUrl={redirectUrl || "/dashboard"}
//         appearance={{
//           elements: {
//             formButtonPrimary: "bg-primary",
//             card: "shadow-none",
//             headerTitle: "Welcome back",
//             headerSubtitle: "Log in to your account",
//             socialButtonsBlockButton: "bg-white border-2 border-stone-200",
//             formFieldInput: "border-2 border-stone-200",
//             footerActionLink: "text-primary hover:text-primary-dark"
//           }
//         }}
//       />
//     </div>
//   );
// };

// export default Login;
// import { SignIn } from "@clerk/clerk-react";
// import { useLocation } from "react-router-dom";

// const Login = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const redirectUrl = searchParams.get('redirect_url');
  
//   return (
//     <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] p-4">
//       <div className="w-full max-w-md">
//         <SignIn
//           routing="path"
//           path="/login"
//           signUpUrl="/signup"
//           redirectUrl={redirectUrl || '/dashboard'}
//         />
//       </div>
//     </div>
//   );
// };

// export default Login;
import { SignIn } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get('redirect_url');
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <SignIn 
        redirectUrl={redirectUrl || '/dashboard'}
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary",
            card: "shadow-none",
            headerTitle: "Welcome back",
            headerSubtitle: "Log in to your account",
            socialButtonsBlockButton: "bg-white border-2 border-stone-200",
            formFieldInput: "border-2 border-stone-200",
            footerActionLink: "text-primary hover:text-primary-dark"
          }
        }}
                />
              </div>
  );
};

export default Login;