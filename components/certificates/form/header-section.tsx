"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues } from "./types";
import { UseFormReturn } from "react-hook-form";
import { DatePicker } from "@/components/ui/date-picker";

interface HeaderSectionProps {
  form: UseFormReturn<FormValues>;
}

export function HeaderSection({ form }: HeaderSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Certificate Information</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <FormField
            control={form.control}
            name='certificate_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certificate ID</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='sample_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sample ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='date_of_report'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Report</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value}
                    setDate={(date) => field.onChange(date || new Date())}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='date_of_report_issue'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Report Issue</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value}
                    setDate={(date) => field.onChange(date || new Date())}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description_of_sample'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description of Sample</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='sample_source'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sample Source</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='submitted_by'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Submitted By</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='customer_contact'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Contact</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='sampled_by'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sampled By</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='date_of_sampling'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Sampling</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value}
                    setDate={(date) => field.onChange(date || new Date())}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='date_sample_received'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Sample Received</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value}
                    setDate={(date) => field.onChange(date || new Date())}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='date_of_analysis'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Analysis</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value}
                    setDate={(date) => field.onChange(date || new Date())}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
