"use client";

import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAppContext } from "@/contexts/app-context-provider";
import { createProfile, getUserProfile } from "@/services/api/modules/me";
import { BirthDateInput } from "./trader/[username]/components/birthdateInputButton";

interface OnboardingFormValues {
  full_name: string;
  username: string;
  birth_date: string;
}

const OnboardingSchema = Yup.object().shape({
  full_name: Yup.string().required("Full name is required"),
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username too long")
    .required("Username is required"),
  birth_date: Yup.string().required("Date of birth is required"),
});

export function OnboardingGate({ onComplete }: { onComplete: () => void }) {
  const { authUser, setUser } = useAppContext();
  const authUserObj = authUser?.user_metadata;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xl">
      <Card className="w-[90%] max-w-md rounded-2xl shadow-lg ">
        <CardHeader>
          <CardTitle className="text-xl">Welcome to Finforum!</CardTitle>
          <CardDescription>
            Let&apos;s set up your profile to get started.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Formik<OnboardingFormValues>
            initialValues={{
              full_name: "",
              username: "",
              birth_date: "",
            }}
            validationSchema={OnboardingSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              const email_address = authUserObj?.email ?? "";

              await toast.promise(
                (async () => {
                  await createProfile({
                    full_name: values.full_name,
                    username: values.username,
                    dob: values.birth_date.split("T")[0],
                    email_address,
                  });

                  const freshUser = await getUserProfile();
                  setUser(freshUser);
                  onComplete();
                })(),
                {
                  loading: "Creating profile...",
                  success: "Profile created successfully!",
                  error: (err) => ({
                    message: "Failed to create profile.",
                    description: err?.message || "Please try again later.",
                  }),
                }
              );

              setSubmitting(false);
            }}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form className="flex flex-col gap-4">
                <div className="grid gap-6">
                  {/* Full Name input */}
                  <Field name="full_name">
                    {({ field, meta }: FieldProps<string>) => (
                      <div className="grid gap-3">
                        <Label htmlFor="full_name">Full name</Label>
                        <Input
                          id="full_name"
                          placeholder="Your full name"
                          {...field}
                          className={
                            meta.touched && meta.error
                              ? "border-destructive"
                              : ""
                          }
                        />
                        {meta.touched && meta.error && (
                          <p className="text-xs text-destructive">
                            {meta.error}
                          </p>
                        )}
                      </div>
                    )}
                  </Field>

                  {/* Date of Birth input */}
                  <Field name="birth_date">
                    {({ meta }: FieldProps<string>) => (
                      <div className="grid gap-3">
                        <Label htmlFor="birth_date">Date of birth</Label>
                        <BirthDateInput
                          name="birth_date"
                          id="birth_date"
                          className={
                            meta.touched && meta.error
                              ? "border-destructive"
                              : ""
                          }
                        />
                        {meta.touched && meta.error && (
                          <p className="text-xs text-destructive">
                            {meta.error}
                          </p>
                        )}
                      </div>
                    )}
                  </Field>

                  {/* Username input */}
                  <Field name="username">
                    {({ field, meta }: FieldProps<string>) => (
                      <div className="grid gap-3">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          placeholder="Your username"
                          {...field}
                          className={
                            meta.touched && meta.error
                              ? "border-destructive"
                              : ""
                          }
                        />
                        {meta.touched && meta.error && (
                          <p className="text-xs text-destructive">
                            {meta.error}
                          </p>
                        )}
                      </div>
                    )}
                  </Field>

                  {/* Submit onboarding form */}
                  <Button
                    type="submit"
                    className="mt-2 w-full"
                    variant={isSubmitting ? "loading" : "default"}
                    disabled={isSubmitting || !isValid || !dirty}
                  >
                    Save and continue
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
