"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FirebaseError } from "firebase/app";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/user-not-found":
            alert("User not found. Please register.");
            break;
          case "auth/wrong-password":
            alert("Incorrect password.");
            break;
          case "auth/invalid-credential":
            alert("Invalid email or password.");
            break;
          default:
            alert(err.message);
        }
      } else {
        // Non-Firebase error
        alert(String(err));
      }
    }
  };

useEffect(() => {
  const unsub = onAuthStateChanged(auth, (user) => {
    if (user) router.replace("/dashboard");
  });
  return () => unsub();
}, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

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

        <Button className="w-full" onClick={login}>
          Login
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}