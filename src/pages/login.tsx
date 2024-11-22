import { AuthForm } from '@/components/auth/auth-form';

function Login() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <AuthForm />
    </div>
  );
}

export default Login;