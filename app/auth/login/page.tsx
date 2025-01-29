import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const handleLogin = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/auth/login?error=" + encodeURIComponent(error.message));
    }

    return redirect("/dashboard");
  };

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
                src='https://res.cloudinary.com/dijdyn5c5/image/upload/v1736880813/logo_lljwcd.png'
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
            <LoginForm handleLogin={handleLogin} />
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
