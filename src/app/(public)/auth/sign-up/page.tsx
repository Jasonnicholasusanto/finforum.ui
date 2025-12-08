import { CopyrightFooter } from "@/components/copyrightFooter";
import { SignUpForm } from "@/app/(public)/auth/sign-up/signup-form";
import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center text-2xl font-extrabold"
        >
          <Image
            src="/images/secondary-logo-dark.png"
            alt="Finforum Secondary Logo Dark"
            width={130}
            height={130}
            priority
            className="hidden dark:block"
          />
        </Link>
        <SignUpForm />
        <CopyrightFooter />
      </div>
    </div>
  );
}
