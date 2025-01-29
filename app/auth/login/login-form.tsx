"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className='w-full bg-[#0086CB] hover:bg-[#005A88] text-white transition-colors'
      type='submit'
      disabled={pending}>
      {pending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Signing in...
        </>
      ) : (
        "Sign in"
      )}
    </Button>
  );
}

export function LoginForm({
  handleLogin,
}: {
  handleLogin: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={handleLogin} className='space-y-4'>
      <div className='space-y-2'>
        <label htmlFor='email' className='text-sm font-medium text-gray-700'>
          Email
        </label>
        <Input
          id='email'
          name='email'
          type='email'
          placeholder='Enter your email'
          className='bg-white/70 border-gray-200'
          required
        />
      </div>
      <div className='space-y-2'>
        <label htmlFor='password' className='text-sm font-medium text-gray-700'>
          Password
        </label>
        <Input
          id='password'
          name='password'
          type='password'
          placeholder='Enter your password'
          className='bg-white/70 border-gray-200'
          required
        />
      </div>
      <SubmitButton />
    </form>
  );
}
