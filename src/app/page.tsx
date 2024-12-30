import AuthForm from "./auth/auth-form";

export default function AuthPage() {
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        alt="Your Company"
                        src="/img/logo.png"
                        className="mx-auto size-28 w-auto"
                    />
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white/20 backdrop-blur-lg px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <AuthForm />
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Contact me for?{' '}
                        <a href="#" className="font-semibold leading-6 text-amber-600 hover:text-amber-500">
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}