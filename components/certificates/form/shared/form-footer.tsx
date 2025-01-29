import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormValues } from "../types";
import { UseFormReturn } from "react-hook-form";
import { SaveIcon, PencilIcon } from "lucide-react";

interface FormFooterProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => Promise<void>;
  isSubmitting?: boolean;
  mode: "create" | "edit";
}

export function FormFooter({
  form,
  onSubmit,
  isSubmitting,
  mode,
}: FormFooterProps) {
  return (
    <div className='relative'>
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <FormField
            control={form.control}
            name='comments'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comments</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Add any additional comments or observations...'
                    className='min-h-[100px]'
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Sticky Footer */}
      <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 z-50'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex justify-end'>
          {mode === "create" ? (
            <Button
              type='submit'
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className='bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200'>
              <SaveIcon className='mr-2 h-4 w-4' />
              {isSubmitting ? "Creating..." : "Create Certificate"}
            </Button>
          ) : (
            <Button
              type='submit'
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className='bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200'>
              <PencilIcon className='mr-2 h-4 w-4' />
              {isSubmitting ? "Updating..." : "Update Certificate"}
            </Button>
          )}
        </div>
      </div>

      {/* Add padding at the bottom to prevent content from being hidden behind the sticky footer */}
      <div className='h-24' />
    </div>
  );
}
