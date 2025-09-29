"use client";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { FormEvent, useState } from "react";
import { LuCalendar } from "react-icons/lu";
import { createProfile } from "@/services/onboardingActions";
import { useAppContext } from "@/contexts/app-context-provider";
import { MotionButton } from "@/components/ui/motion-button";
import { getUserData } from "@/services/getUserDataActions";

export function OnboardingGate({ onComplete }: { onComplete: () => void }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authUser, setUser } = useAppContext();
  const authUserObj = authUser?.user_metadata;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const full_name = form.get("full_name") as string;
    const username = form.get("username") as string;
    const dob = date?.toISOString().split("T")[0] ?? "";
    const email_address = authUserObj?.email ?? "";

    try {
      await createProfile({ full_name, dob, username, email_address });

      const freshUser = await getUserData();
      setUser(freshUser);

      onComplete();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xl">
      <Card className="w-[90%] max-w-md rounded-2xl shadow-lg bg-white dark:bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-xl">Welcome to Finforum!</CardTitle>
          <CardDescription>
            Let's set up your profile to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="full_name">Full name</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="date">Date of birth</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <LuCalendar />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  name="username"
                  placeholder="Your username"
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}
              <MotionButton
                type="submit"
                className="mt-2 w-full"
                variant={loading ? "loading" : "default"}
                disabled={loading}
              >
                Save and continue
              </MotionButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
