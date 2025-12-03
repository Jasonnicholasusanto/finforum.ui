import * as yup from "yup";

export const userProfileSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers, and underscores allowed"
    )
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),

  full_name: yup.string().required("Full name is required"),

  display_name: yup.string().nullable(),

  phone_number: yup
    .string()
    .nullable()
    .matches(/^\+[1-9]\d{6,14}$/, "Invalid phone number format")
    .optional(),

  birth_date: yup
    .string()
    .nullable()
    .test("is-valid-date", "Invalid date format", (value) =>
      value ? !isNaN(Date.parse(value)) : true
    ),

  bio: yup.string().max(2500, "Bio must not exceed 2500 characters").nullable(),
});
