"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { LuListPlus } from "react-icons/lu";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";

interface CreateWatchlistDialogProps {
  isIconOnly?: boolean;
}

const CreateWatchlistSchema = Yup.object().shape({
  name: Yup.string().required("Watchlist name is required"),
  visibility: Yup.string().required("Visibility is required"),
  description: Yup.string().optional(),
  is_default: Yup.boolean().optional(),
});

export function CreateWatchlistDialog({
  isIconOnly = false,
}: CreateWatchlistDialogProps) {
  const [open, setOpen] = useState(false);
  const [watchlistTypes, setWatchlistTypes] = useState<string[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    async function fetchTypes() {
      try {
        setLoadingTypes(true);
        const res = await fetch("/api/watchlists/types");
        const data = await res.json();
        setWatchlistTypes(data ?? []);
      } catch (err) {
        console.error("Failed to load watchlist types:", err);
      } finally {
        setLoadingTypes(false);
      }
    }

    fetchTypes();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            {isIconOnly ? (
              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground size-8 rounded-full shadow-none"
              >
                <LuListPlus className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            ) : (
              <Button variant="default">+ Create Watchlist</Button>
            )}
          </DialogTrigger>
        </TooltipTrigger>

        <TooltipContent side="bottom">Create a new watchlist</TooltipContent>
      </Tooltip>

      <DialogContent className="max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>Create a new watchlist</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={{
            name: "",
            description: "",
            visibility: "",
            is_default: false,
          }}
          validationSchema={CreateWatchlistSchema}
          onSubmit={async (values, { resetForm }) => {
            const payload = {
              watchlist_data: {
                name: values.name,
                description: values.description,
                visibility: values.visibility,
                is_default: values.is_default,
              },
              items: [],
            };

            const createWatchlistTask = (async () => {
              try {
                setIsSubmitting(true);
                const res = await fetch("/api/watchlists/base", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(payload),
                });

                if (!res.ok) {
                  alert("Failed to create watchlist.");
                  return;
                }
                resetForm();
                setOpen(false);
              } catch (err) {
                console.error("Failed removing banner image", err);
                throw err;
              } finally {
                setIsSubmitting(false);
              }
            })();

            try {
              await toast.promise(createWatchlistTask, {
                loading: "Creating watchlist...",
                success: "Watchlist created successfully.",
                error: (err) => ({
                  message: "Failed to create watchlist.",
                  description: err?.message || "Please try again later.",
                }),
              });
            } catch (err) {
              // Error is already handled in the uploadTask
            }
          }}
        >
          {({ values, errors, touched, setFieldValue, isValid, dirty }) => (
            <Form className="flex flex-col gap-4 mt-4">
              {/* Watchlist name */}
              <div className="flex flex-col gap-2">
                <Label>Watchlist name *</Label>
                <Field
                  as={Input}
                  name="name"
                  placeholder="e.g. Tech Growth Picks"
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Field
                  as={Textarea}
                  name="description"
                  placeholder="Optional description..."
                />
              </div>

              {/* Visibility */}
              <div className="flex flex-col gap-2 w-full">
                <Label>Visibility *</Label>

                <Select
                  onValueChange={(v) => setFieldValue("visibility", v)}
                  value={values.visibility}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        loadingTypes ? "Loading..." : "Select visibility…"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {watchlistTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0) + type.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.visibility && touched.visibility && (
                  <p className="text-red-500 text-sm">{errors.visibility}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>Make this your default watchlist?</Label>

                <Tabs
                  value={values.is_default ? "yes" : "no"}
                  onValueChange={(v) =>
                    setFieldValue("is_default", v === "yes")
                  }
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="yes">Yes</TabsTrigger>
                    <TabsTrigger value="no">No</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Future items picker */}
              <div className="mt-2 text-sm text-muted-foreground">
                Stock picker coming soon…
              </div>

              <DialogFooter>
                <Button
                  variant={isSubmitting ? "loading" : "default"}
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  Create Watchlist
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
