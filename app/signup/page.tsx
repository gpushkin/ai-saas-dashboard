"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firestore";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FirebaseError } from "firebase/app";

function isFirebaseError(e: unknown): e is FirebaseError {
  return (
    typeof e === "object" &&
    e !== null &&
    "code" in e &&
    "message" in e
  );
}

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signup = async () => {
    if (!email.trim() || !password) {
      alert("Please enter an email and password");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password should be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      // 2️⃣ Save user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        role: "user", // default role
        createdAt: serverTimestamp(),
      });

      // 3️⃣ Redirect to dashboard
      router.push("/dashboard");

    } catch (error: unknown) {
      if (isFirebaseError(error)) {
        console.error("Firebase signup error:", error.code, error.message);

        let message = error.message;

        if (
          typeof error.code === "string" &&
          error.code.toLowerCase().includes("api-key")
        ) {
          message =
            "Firebase API key appears invalid. Please verify NEXT_PUBLIC_FIREBASE_API_KEY in .env.local " +
            "and restart the dev server.";
        } else {
          switch (error.code) {
            case "auth/weak-password":
              message = "Password should be at least 6 characters.";
              break;
            case "auth/invalid-email":
              message = "Please enter a valid email address.";
              break;
            case "auth/email-already-in-use":
              message = "This email is already registered. Try logging in.";
              break;
          }
        }

        alert(message);
      } else {
        console.error("Unknown error", error);
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {password && confirmPassword && password !== confirmPassword && (
          <p className="text-sm text-red-500">Passwords do not match</p>
        )}

        <Button className="w-full" onClick={signup} disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}