// import { useSignUp } from "@clerk/clerk-react";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const EmailVerification = () => {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const [verificationCode, setVerificationCode] = useState("");
//   const [error, setError] = useState("");
//   const [isVerifying, setIsVerifying] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // If signUp is not available, the user may have refreshed the page or accessed this page directly
//     if (isLoaded && !signUp) {
//       navigate("/signup");
//     }
//   }, [isLoaded, signUp, navigate]);

//   // Send verification email when component mounts
//   useEffect(() => {
//     if (isLoaded && signUp) {
//       // Make sure verification email is sent
//       signUp.prepareEmailAddressVerification();
//     }
//   }, [isLoaded, signUp]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!isLoaded || !signUp) {
//       setError("Verification session not found. Please try signing up again.");
//       return;
//     }

//     if (!verificationCode.trim()) {
//       setError("Please enter the verification code sent to your email.");
//       return;
//     }

//     try {
//       setIsVerifying(true);
//       setError("");
      
//       // Attempt to verify the email with the provided code
//       await signUp.attemptEmailAddressVerification({
//         code: verificationCode
//       });

//       // Check verification status
//       if (signUp.status === "complete" && signUp.verifications.emailAddress.status === "verified") {
//         // Email is verified and sign up is complete
//         // Automatically activate the session and redirect
//         await setActive({ session: signUp.createdSessionId });
//         navigate("/start-saving");
//       } else {
//         setError("Verification failed. Please check your code and try again.");
//       }
//     } catch (err: any) {
//       console.error("Verification error:", err);
//       setError(err.message || "Verification failed. Please try again.");
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   if (!isLoaded || !signUp) {
//     return <div className="min-h-screen flex items-center justify-center">Loading verification...</div>;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background p-4">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold">Verify Your Email</h1>
//           <p className="text-muted-foreground mt-2">
//             We've sent a verification code to your email address.
//             Enter the code below to complete your registration.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="verification-code" className="block text-sm font-medium mb-1">
//               Verification Code
//             </label>
//             <input
//               id="verification-code"
//               type="text"
//               value={verificationCode}
//               onChange={(e) => setVerificationCode(e.target.value)}
//               className="w-full px-4 py-2 border-2 border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               placeholder="Enter verification code"
//               autoComplete="off"
//             />
//           </div>

//           {error && (
//             <div className="text-red-500 text-sm py-1">{error}</div>
//           )}

//           <button
//             type="submit"
//             disabled={isVerifying}
//             className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors disabled:opacity-70"
//           >
//             {isVerifying ? "Verifying..." : "Verify Email"}
//           </button>
//         </form>

//         <div className="text-center text-sm">
//           <p>
//             Didn't receive a code?{" "}
//             <button
//               type="button"
//               onClick={() => signUp.prepareEmailAddressVerification()}
//               className="text-primary hover:text-primary-dark focus:outline-none"
//             >
//               Resend code
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailVerification;

// import { useSignUp } from "@clerk/clerk-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const { isLoaded, signUp } = useSignUp();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!isLoaded) {
//       return;
//     }

//     // Simple validation
//     if (!email || !password || !firstName) {
//       setError("Please fill out all required fields.");
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       setError("");

//       // Start the sign-up process
//       await signUp.create({
//         emailAddress: email,
//         password,
//         firstName,
//         lastName
//       });

//       // Prepare for email verification
//       await signUp.prepareEmailAddressVerification({
//         strategy: "email_code"
//       });

//       // Navigate to the email verification page
//       navigate("/signup/verify-email-address");
//     } catch (err: any) {
//       console.error("Error during sign up:", err);
//       setError(err.message || "Sign up failed. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!isLoaded) {
//     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background p-4">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold">Create your account</h1>
//           <p className="text-muted-foreground mt-2">
//             Get started with group buying
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="firstName" className="block text-sm font-medium mb-1">
//               First Name *
//             </label>
//             <input
//               id="firstName"
//               type="text"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="w-full px-4 py-2 border-2 border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               placeholder="Enter your first name"
//             />
//           </div>

//           <div>
//             <label htmlFor="lastName" className="block text-sm font-medium mb-1">
//               Last Name
//             </label>
//             <input
//               id="lastName"
//               type="text"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               className="w-full px-4 py-2 border-2 border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               placeholder="Enter your last name"
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium mb-1">
//               Email *
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border-2 border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium mb-1">
//               Password *
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border-2 border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               placeholder="Create a password"
//             />
//           </div>

//           {error && (
//             <div className="text-red-500 text-sm py-1">{error}</div>
//           )}

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors disabled:opacity-70"
//           >
//             {isSubmitting ? "Creating Account..." : "Create Account"}
//           </button>
//         </form>

//         <div className="text-center text-sm">
//           <p>
//             Already have an account?{" "}
//             <a href="/login" className="text-primary hover:text-primary-dark">
//               Log in
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
// import { useSignUp } from "@clerk/clerk-react";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const EmailVerification = () => {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     // If signUp is not available, the user may have refreshed the page or accessed this page directly
//     if (isLoaded && !signUp) {
//       navigate("/signup");
//       return;
//     }

//     // Listen for verification status changes
//     if (isLoaded && signUp) {
//       const checkStatus = () => {
//         if (signUp.status === "complete" && signUp.verifications.emailAddress.status === "verified") {
//           // Email is verified and sign up is complete
//           // Automatically activate the session and redirect
//           setActive({ session: signUp.createdSessionId })
//             .then(() => navigate("/start-saving"))
//             .catch(err => console.error("Error activating session:", err));
//         }
//       };
      
//       // Check immediately and set up interval
//       checkStatus();
//       const interval = setInterval(checkStatus, 1000);
      
//       return () => clearInterval(interval);
//     }
//   }, [isLoaded, signUp, setActive, navigate]);

//   if (!isLoaded || !signUp) {
//     return <div className="min-h-screen flex items-center justify-center">Loading verification...</div>;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background p-4">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold">Verify Your Email</h1>
//           <p className="text-muted-foreground mt-2">
//             We've sent a verification link to {signUp.emailAddress}.
//             Please check your email and click the link to complete your registration.
//           </p>
//         </div>
        
//         <div className="py-6">
//           <div className="flex justify-center items-center space-x-2">
//             <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
//             <div className="w-4 h-4 rounded-full bg-primary animate-pulse delay-100"></div>
//             <div className="w-4 h-4 rounded-full bg-primary animate-pulse delay-200"></div>
//           </div>
//           <p className="text-center mt-4 text-sm text-muted-foreground">
//             Waiting for verification...
//           </p>
//         </div>

//         <div className="text-center text-sm">
//           <p>
//             Didn't receive an email?{" "}
//             <button
//               type="button"
//               onClick={() => signUp.prepareEmailAddressVerification()}
//               className="text-primary hover:text-primary-dark focus:outline-none"
//             >
//               Resend verification email
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailVerification;
import { useSignUp } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If signUp is not available, the user may have refreshed the page or accessed this page directly
    if (isLoaded && !signUp) {
      navigate("/signup");
    }
  }, [isLoaded, signUp, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLoaded || !signUp) {
      setError("Verification session not found. Please try signing up again.");
      return;
    }

    if (!verificationCode.trim()) {
      setError("Please enter the verification code sent to your email.");
      return;
    }

    try {
      setIsVerifying(true);
      setError("");
      
      // Attempt to verify the email with the provided code
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode
      });

      if (completeSignUp.status === "complete") {
        // Email is verified and sign up is complete
        // Automatically activate the session and redirect
        await setActive({ session: completeSignUp.createdSessionId });
        navigate("/start-saving");
      } else {
        setError("Verification failed. Please check your code and try again.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = () => {
    if (!isLoaded || !signUp) return;
    
    signUp.prepareEmailAddressVerification({ strategy: "email_code" })
      .then(() => {
        setError("Verification code has been resent.");
        setTimeout(() => setError(""), 3000);
      })
      .catch((err) => {
        console.error("Error sending verification code:", err);
        setError("Failed to resend verification code. Please try again.");
      });
  };

  if (!isLoaded || !signUp) {
    return <div className="min-h-screen flex items-center justify-center">Loading verification...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Verify Your Email</h1>
          <p className="text-muted-foreground mt-2">
            We've sent a verification code to {signUp.emailAddress}.
            Enter the code below to complete your registration.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="verification-code" className="block text-sm font-medium mb-1">
              Verification Code
            </label>
            <input
              id="verification-code"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter verification code"
              autoComplete="off"
            />
          </div>

          {error && (
            <div className={`text-sm py-1 ${error.includes("resent") ? "text-green-500" : "text-red-500"}`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors disabled:opacity-70"
          >
            {isVerifying ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="text-center text-sm">
          <p>
            Didn't receive a code?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              className="text-primary hover:text-primary-dark focus:outline-none"
            >
              Resend code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;