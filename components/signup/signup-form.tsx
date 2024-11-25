"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../signin/ui/label";
import { Input } from "../signin/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleError] = useSignInWithGoogle(auth);
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstname = (e.currentTarget.elements.namedItem("firstname") as HTMLInputElement).value;
    const lastname = (e.currentTarget.elements.namedItem("lastname") as HTMLInputElement).value;
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;
    const confirmPassword = (e.currentTarget.elements.namedItem("confirm-password") as HTMLInputElement).value;

    // Password validation
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setPasswordError(passwordErrors.join(" "));
      setTimeout(() => setPasswordError(""), 10000);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      setTimeout(() => setPasswordError(""), 10000);
      return;
    }

    setPasswordError("");
    setFormError("");
    createUserWithEmailAndPassword(email, password).catch((err) => {
      setFormError(err.message);
      setTimeout(() => setFormError(""), 10000);
    });
  };

  useEffect(() => {
    if (user || googleUser) {
      router.push("/dashboard");
    }
  }, [user, googleUser, router]);

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Curiopay
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign up to continue to Curiopay
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="firstname">First Name</Label>
          <Input id="firstname" placeholder="John" type="text" required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="lastname">Last Name</Label>
          <Input id="lastname" placeholder="Doe" type="text" required />
        </LabelInputContainer>
      </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="someone@example.com" type="email" required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" placeholder="••••••••" type="password" required />
        </LabelInputContainer>

        {passwordError && <p className="text-red-500 mt-2 mb-4">{passwordError}</p>}
        {formError && <p className="text-red-500 mt-2">{formError}</p>}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
        {error && <p className="text-red-500 mt-2">{error.message}</p>}

        <div className="mt-4">
          <Link href="/login">
            Already have an account? Sign in
          </Link>
        </div>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
            onClick={() => signInWithGoogle().catch((err) => {
              setFormError(err.message);
              setTimeout(() => setFormError(""), 10000);
            })}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Sign up with Google
            </span>
            <BottomGradient />
          </button>
          {googleError && <p className="text-red-500 mt-2">{googleError.message}</p>}
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};