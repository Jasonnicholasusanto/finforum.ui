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

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { LuListPlus } from "react-icons/lu";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ScreenerTickerInfo } from "@/models/screener";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { WatchlistItemRow } from "./watchlistItemRow";

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
  const [quantityTypes, setQuantityTypes] = useState<string[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const [activeCategory, setActiveCategory] = useState<string>("equity");
  const [categoryResults, setCategoryResults] = useState<ScreenerTickerInfo[]>(
    []
  );
  const [loadingCategory, setLoadingCategory] = useState(false);

  // search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

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

    async function fetchQuantityTypes() {
      try {
        setLoadingTypes(true);
        const res = await fetch("/api/watchlists/quantity_types");
        const data = await res.json();
        setQuantityTypes(data ?? []);
      } catch (err) {
        console.error("Failed to load quantity types:", err);
      } finally {
        setLoadingTypes(false);
      }
    }

    fetchTypes();
    fetchQuantityTypes();
  }, [open]);

  async function createWatchlist({
    payload,
    resetForm,
    setIsSubmitting,
    setOpen,
  }: {
    payload: any;
    resetForm: () => void;
    setIsSubmitting: (v: boolean) => void;
    setOpen: (v: boolean) => void;
  }) {
    const task = (async () => {
      try {
        setIsSubmitting(true);

        const res = await fetch("/api/watchlists/base", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error("Failed to create watchlist");
        }

        resetForm();
        setOpen(false);
      } finally {
        setIsSubmitting(false);
      }
    })();

    await toast.promise(task, {
      loading: "Creating watchlist...",
      success: "Watchlist created successfully.",
      error: (err) => ({
        message: "Failed to create watchlist.",
        description: err?.message || "Please try again later.",
      }),
    });
  }

  const handleCategoryChange = async (category: string) => {
    setActiveCategory(category);
    setLoadingCategory(true);

    try {
      const res = await fetch(
        `/api/screener/curated?asset_type=${category}&limit=25`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch curated screen");
      }

      const data = await res.json();
      setCategoryResults(
        Array.isArray(data?.results?.results) ? data.results.results : []
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to load curated screen");
    } finally {
      setLoadingCategory(false);
    }
  };

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
            quantity_type: "",
            is_default: false,
          }}
          validationSchema={CreateWatchlistSchema}
          onSubmit={async (values, { resetForm }) => {
            const payload = {
              watchlist_data: {
                name: values.name,
                description: values.description,
                visibility: values.visibility,
                quantity_type: values.quantity_type,
                is_default: values.is_default,
              },
              items: [],
            };

            await createWatchlist({
              payload,
              resetForm,
              setIsSubmitting,
              setOpen,
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            isValid,
            dirty,
            validateForm,
            setTouched,
          }) => (
            <Form className="flex flex-col gap-4">
              {step === 1 ? (
                <div className="flex flex-col gap-4 mt-4 mb-4">
                  {/* Watchlist name */}
                  <div className="flex flex-col gap-2">
                    <Label>Watchlist name *</Label>

                    <Field name="name">
                      {({ field, meta }: any) => (
                        <>
                          <Input
                            {...field}
                            placeholder="e.g. Tech Growth Picks"
                            className={cn(
                              "rounded-lg",
                              meta.touched && meta.error && "border-destructive"
                            )}
                          />

                          {meta.touched && meta.error && (
                            <p className="text-destructive text-sm">
                              {meta.error}
                            </p>
                          )}
                        </>
                      )}
                    </Field>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
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
                        <p className="text-red-500 text-sm">
                          {errors.visibility}
                        </p>
                      )}
                    </div>

                    {/* Quantity type */}
                    <div className="flex flex-col gap-2 w-full">
                      <Label>Quantity type *</Label>

                      <Select
                        onValueChange={(v) => setFieldValue("quantity_type", v)}
                        value={values.quantity_type}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              loadingTypes
                                ? "Loading..."
                                : "Select quantity type…"
                            }
                          />
                        </SelectTrigger>

                        <SelectContent>
                          {quantityTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0) + type.slice(1).toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {errors.quantity_type && touched.quantity_type && (
                        <p className="text-red-500 text-sm">
                          {errors.quantity_type}
                        </p>
                      )}
                    </div>
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
                </div>
              ) : (
                <div className="flex flex-col gap-4 mt-4 mb-4">
                  {/* Header */}
                  <div className="flex flex-col gap-1">
                    <Label>Add items (optional)</Label>
                    <p className="text-xs text-muted-foreground">
                      Seed your watchlist with popular assets — or skip for now.
                    </p>
                  </div>

                  {/* Category Tabs */}
                  <Tabs
                    value={activeCategory ?? "equity"}
                    onValueChange={handleCategoryChange}
                  >
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="equity">Stocks</TabsTrigger>
                      <TabsTrigger value="fund">Funds</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  {/* Results */}
                  <div className="border rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/50">
                      <div className="flex items-center gap-3">
                        <span className="w-8" />
                        <span>Code</span>
                      </div>

                      <div className="flex items-center gap-6">
                        <span className="w-[100px] text-right">Price</span>
                        <span className="w-[90px] text-right">Day</span>
                        <span className="w-[64px]" /> {/* action spacer */}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="divide-y max-h-64 overflow-y-auto">
                      {loadingCategory ? (
                        <div className="p-4 text-sm text-muted-foreground">
                          Loading…
                        </div>
                      ) : categoryResults.length === 0 ? (
                        <div className="p-4 text-sm text-muted-foreground">
                          No results available
                        </div>
                      ) : (
                        categoryResults.map((item: ScreenerTickerInfo) => (
                          <WatchlistItemRow
                            key={item.symbol}
                            item={item}
                            onAdd={(symbol) => {
                              setCategoryResults((prev) =>
                                prev.filter((x) => x.symbol !== symbol)
                              );
                            }}
                          />
                        ))
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    You can always add or remove items later.
                  </p>
                </div>
              )}

              <DialogFooter>
                {step === 1 ? (
                  <Button
                    type="button"
                    className="w-full"
                    disabled={
                      isSubmitting ||
                      !values.name ||
                      !values.visibility ||
                      !!errors.name ||
                      !!errors.visibility
                    }
                    onClick={async () => {
                      const errors = await validateForm();

                      if (errors.name || errors.visibility) {
                        setTouched({
                          name: true,
                          visibility: true,
                        });
                        return;
                      }

                      setStep(2);
                      handleCategoryChange(activeCategory);
                    }}
                  >
                    Continue
                  </Button>
                ) : (
                  <div className="flex w-full justify-between gap-2">
                    <Button
                      type="button"
                      disabled={isSubmitting}
                      variant="secondary"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      variant={isSubmitting ? "loading" : "default"}
                      disabled={isSubmitting || !isValid || !dirty}
                      className="flex-1"
                      type="submit"
                    >
                      Create Watchlist
                    </Button>
                  </div>
                )}
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
