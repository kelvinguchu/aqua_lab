"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/lib/supabase/client";

const formSchema = z.object({
  email: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Authentication error:", error);
      setError(error instanceof Error ? error.message : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='flex min-h-screen bg-gradient-to-br from-blue-50 to-white'>
      <div className='flex-1 hidden lg:block bg-[#0086CB] relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-[#0086CB]/90 to-[#005A88]/90' />
        <div className='absolute inset-0 flex items-center justify-center p-12'>
          <div className='text-white space-y-8'>
            <h1 className='text-4xl font-bold'>
              Water & Effluent Treatment Specialists
            </h1>
          </div>
        </div>
      </div>

      <div className='flex-1 flex items-center justify-center p-8'>
        <Card className='w-full max-w-md border-0 shadow-xl bg-white/50 backdrop-blur-sm'>
          <CardHeader className='space-y-6 items-center text-center'>
            <div className='w-64 h-32 relative mx-auto'>
              <Image
                src='/logo.png'
                alt='Aquatreat Solutions Ltd Logo'
                width={256}
                height={256}
              />
            </div>
            <div>
              <CardTitle className='text-2xl font-bold text-[#0086CB]'>
                Lab Portal
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'>
                {error && (
                  <div className='bg-red-50 text-red-600 p-3 rounded-md text-sm'>
                    {error}
                  </div>
                )}
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700'>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Enter your email'
                          className='bg-white/70 border-gray-200'
                          disabled={isLoading}
                          suppressHydrationWarning
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700'>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Enter your password'
                          className='bg-white/70 border-gray-200'
                          {...field}
                          disabled={isLoading}
                          suppressHydrationWarning
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className='w-full bg-[#0086CB] hover:bg-[#005A88] text-white transition-colors'
                  type='submit'
                  disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Sign in
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className='flex flex-col space-y-4'>
            <div className='text-sm text-gray-600 text-center'>
              Forgot your password or need access? Contact IT Support
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
