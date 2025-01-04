import React, { Fragment, useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
// import { productVariantSchema } from '@/types/product-variant-schema';
import { useFieldArray, useFormContext } from 'react-hook-form'
import { UploadDropzone } from '@/app/api/uploadthing/upload';
import { z } from 'zod';
// import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteUTFiles } from '@/server/actions/delete-images';
import { Reorder } from 'framer-motion';
// import { deleteVariantImageAction } from '@/server/actions/delete-image';
import { productSchema } from '@/types/product-schema';
// import { useAction } from 'next-safe-action/hooks';


const VariantImages = () => {
    const { getValues, control, setError } = useFormContext<z.infer<typeof productSchema>>();
    const { fields, remove, append, update, move } = useFieldArray({
        control,
        name: 'image'
    });
    // console.log(fields);

    const [active, setActive] = useState(0);

    const deleteImage = async (key: any) => {
        const imageToDelete = [key];
        // const resp = await deleteVariantImageAction({ id: idVariant, key });
        await deleteUTFiles(imageToDelete);

    }

    return (
        <div>
            <FormField
                control={control}
                name="image"
                render={({ field }) => (
                    <FormItem className='max-w-2xl'>
                        <FormLabel>Imagen</FormLabel>
                        <FormControl>
                            <UploadDropzone
                                className='ut-allowed-content:text-amber-300 ut-label:text-amber-500 ut-upload-icon:text-amber-500/60 hover:bg-amber-500/10 transition-all duration-500 ease-in-out border-amber-500 ut-button:bg-amber-500/75 ut-button:ut-readying:bg-amber-400'
                                endpoint='productUploader'
                                onUploadError={(error) => {
                                    setError('image', {
                                        type: 'validate',
                                        message: error.message,
                                    })
                                    return;
                                }}
                                onBeforeUploadBegin={(files) => {
                                    files.map((file) => append({
                                        name: file.name,
                                        size: file.size,
                                        url: URL.createObjectURL(file),
                                    }));
                                    return files;
                                }}
                                onClientUploadComplete={(files) => {
                                    const images = getValues('image');
                                    images.map((image, i) => {
                                        if (image.url.search('blob:') === 0) {
                                            const imagen = files.find((img) => img.name === image.name);
                                            if (imagen) {
                                                update(i, {
                                                    url: imagen.url,
                                                    name: imagen.name,
                                                    size: imagen.size,
                                                    key: imagen.key,
                                                })
                                            }
                                        }
                                    });
                                    return;
                                }}
                                config={{ mode: 'auto' }}
                                onUploadProgress={() => {
                                    // console.log('cargando');
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className='overflow-x-auto rounded-md max-w-2xl'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {/* <TableHead className="w-[100px]">Order</TableHead> */}
                            <TableHead>Name</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead className='text-center'>Image</TableHead>
                            <TableHead>Actions</TableHead>
                            {/* <TableHead className="text-right">Amount</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <Reorder.Group
                        as='tbody'
                        values={fields}
                        onReorder={(e) => {
                            const activeElement = fields[active];
                            e.map((item, i) => {
                                if (item === activeElement) {
                                    move(active, i);
                                    setActive(i);
                                    return;
                                }
                                return;
                            })
                        }}
                    >
                        {fields.map((field, i) => {
                            return (
                                <tr key={i}>
                                    {/* <TableCell className='font-medium'>{i}</TableCell> */}
                                    <TableCell className='border-2'>{field.name}</TableCell>
                                    <TableCell className='border-2'>{(field.size / (1024 * 1024)).toFixed(2)} MB</TableCell>
                                    <TableCell className='border-2'>
                                        <div className='flex items-center justify-center'>
                                            <img
                                                className='rounded-lg w-auto h-20'
                                                src={field.url}
                                                alt={field.name}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant={'ghost'}
                                            className='rounded-full scale-110'
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                await deleteImage(field.key);
                                                remove(i);
                                            }}
                                        >
                                            <TrashIcon
                                                className='h-4 w-4'
                                            />
                                        </Button>
                                    </TableCell>
                                </tr>
                            );
                        })}
                    </Reorder.Group>
                </Table>
            </div>
        </div>
    )
}

export default VariantImages