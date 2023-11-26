import { object, string } from "yup";

export const LoginSchema = object().shape({
    email: string().email().required(),
    password: string().required(),
});