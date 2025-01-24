"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormValues, TestParameterWithMeta } from "./types";
import { UseFormReturn } from "react-hook-form";

interface TestParameterProps {
  form: UseFormReturn<FormValues>;
  parameter: TestParameterWithMeta;
}

export function TestParameter({ form, parameter }: TestParameterProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <FormField
        control={form.control}
        name={parameter.resultKey}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{parameter.name} Result</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value?.toString() || ""}
                placeholder='Enter result'
                className='font-mono'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={parameter.remarkKey}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{parameter.name} Remark</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value?.toString() || ""}
                placeholder='Enter remark'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
