import { object, string } from "yup";

export const UpdateAccountSchema = object().shape({
    email: string().email().required(),
    name: string().required(),
    description: string().required(),
    companyName: string().required(),

})