"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormValues, TestParameterWithMeta } from "../types";
import { UseFormReturn } from "react-hook-form";

interface TestParameterProps<T> {
  form: UseFormReturn<FormValues>;
  parameter: TestParameterWithMeta<T>;
}

export function TestParameter<T>({ form, parameter }: TestParameterProps<T>) {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <FormField
        control={form.control}
        name={parameter.resultKey as keyof FormValues}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{parameter.name}</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value?.toString() || ""}
                className='font-mono'
                type={parameter.type === "number" ? "number" : "text"}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={parameter.remarkKey as keyof FormValues}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Remark</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className='space-y-2'>
        <div className='text-sm font-medium text-muted-foreground'>
          Standard
        </div>
        <div className='h-10 px-3 py-2 text-sm border rounded-md bg-muted/10'>
          {parameter.standard} {parameter.unit}
        </div>
      </div>
    </div>
  );
}
