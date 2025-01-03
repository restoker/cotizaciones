import { z } from "zod";

export const productSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string().min(5, { message: 'Title must be at least 5 characters long' }),
    description: z.string().min(40, { message: 'Description must be at least 40 characters long' }),
    price: z.coerce.number({ invalid_type_error: 'Price must be a number' }).positive({ message: 'Price must be a positive number' }),
    image: z.array(z.object({
        url: z.string().refine((url) => url.search('blob:') !== 0, { message: 'Plese wait for the image to upload' }),
        size: z.number(),
        name: z.string(),
        key: z.string().optional(),
        id: z.number().optional(),
    })).max(1, { message: 'You must provide one image' })
});

export type ProductSchemaType = z.infer<typeof productSchema>;