import { object, number, string } from "yup";

export const CreateProductSchema = object().shape({
    title: string().required(),
    description: string().required(),
    maxQuantity: string().required('Inventory is required'),
    price: number().integer().required(),
    categoryTitle: string().required('Category is required'),
});

export const UpdateProductSchema = object().shape({

})