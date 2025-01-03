'use client';

import React from 'react'
import { CurrencyDollarIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductSchemaType } from '@/types/product-schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAction } from 'next-safe-action/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import VariantImages from './variant-images';
import Tiptap from './Tiptap';
import { createProductAction } from '@/server/actions/create-product';

interface FormProps {
    editMode: boolean,
    productId?: string,
    children: React.ReactNode,
}

const FormProduct = ({ editMode, children, productId }: FormProps) => {
    const form = useForm<ProductSchemaType>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            image: [],
        },
        mode: "onChange",
    })

    const { execute, status } = useAction(createProductAction, {})


    function onSubmit(values: z.infer<typeof productSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        // execute(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-12">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className='max-w-xl'>
                                <FormLabel>Nombre producto</FormLabel>
                                <FormControl>
                                    <Input placeholder="Zapatillas addidas" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className='max-w-xl'>
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                    <Tiptap
                                        value={field.value}
                                    // setValue={form.setValue} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className='max-w-xl'>
                                <FormLabel>Precio</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-2">
                                        <CurrencyDollarIcon
                                            className="bg-muted  rounded-md size-8"
                                        />
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Your price in USD"
                                            step="0.1"
                                            min={0}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <VariantImages />

                    <Button
                        className="max-w-2xl bg-amber-500 text-black"
                        disabled={
                            status === "executing" ||
                            !form.formState.isValid ||
                            !form.formState.isDirty
                        }
                        type="submit"
                    >
                        {editMode ? "Save Changes" : "Crear Producto"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FormProduct