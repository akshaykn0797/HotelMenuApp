import { object, string } from "yup";

export const QuerySchema = object().shape({
    query: string().required(),
});