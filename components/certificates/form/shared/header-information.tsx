"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { FormValues } from "../types";
import { UseFormReturn } from "react-hook-form";
import type { Certificate } from "@/lib/supabase";
import React from "react";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeaderInformationProps {
  form: UseFormReturn<FormValues>;
  certificate?: Certificate;
  certificateId?: string;
}

export function HeaderInformation({
  form,
  certificate,
  certificateId,
}: HeaderInformationProps) {
  // Check if we're generating a certificate ID
  const isGenerating = !certificate && !certificateId;

  // Get the ID to display, ensuring it's uppercase
  const displayId = (
    certificate?.certificate_id ||
    certificateId ||
    "Generating..."
  ).toUpperCase();

  // Get the certificate type
  const certificateType = form.watch("certificate_type");
  const isEffluent = certificateType === "effluent";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Certificate Information</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {/* Certificate ID field */}
        <FormField
          control={form.control}
          name='certificate_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certificate ID</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    {...field}
                    className='font-mono uppercase'
                    readOnly
                    value={certificate?.certificate_id || certificateId || ""}
                  />
                  {isGenerating && (
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                      <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                    </div>
                  )}
                </div>
              </FormControl>
              {isGenerating && (
                <p className='text-sm text-muted-foreground'>
                  Generating certificate ID...
                </p>
              )}
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
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(date) => field.onChange(date?.toISOString())}
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
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(date) => field.onChange(date?.toISOString())}
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
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(date) => field.onChange(date?.toISOString())}
                />
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
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(date) => field.onChange(date?.toISOString())}
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
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(date) => field.onChange(date?.toISOString())}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Effluent Type Selector - Only show for effluent certificates */}
        {isEffluent && (
          <FormField
            control={form.control}
            name='effluent_type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Effluent Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select effluent type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='environment'>
                      Environment Discharge
                    </SelectItem>
                    <SelectItem value='public_sewers'>
                      Public Sewers Discharge
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
}
