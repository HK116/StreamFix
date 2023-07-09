import axios from "axios";

import { useCallback, useState } from "react";
import Input from "../components/Input";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";

const Auth = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register': 'login')
    }, []);

    // For Login 
    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email, 
                password,
                redirect: false,
                callbackUrl: '/'
            });

            router.push('/')
        }
        catch (error){
            console.log(error)
        }

    }, [email, password, router]);

    // For registration
    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            });

            login();
        } 
        catch (error){
            console.log(error)
        }

    }, [email, name, password, login]);


    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
            <div className="bg-black w-full h-full lg:bg-opacity-70">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-12" />
                </nav>

                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-80 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? 'Sign In' : 'Create an account'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register' && (
                            <Input
                                id={"name"}
                                onChange={(event: any) => setName(event.target.value)}
                                value={name}
                                label="Name"
                                type="text"
                            />
                            )}
                            <Input
                                id={"email"}
                                onChange={(event: any) => setEmail(event.target.value)}
                                value={email}
                                label="Email"
                                type="email"
                            />
                            <Input
                                id={"password"}
                                onChange={(event: any) => setPassword(event.target.value)}
                                value={password}
                                label="Password"
                                type="password"
                            />
                        </div>
                        <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant === 'login' ? 'Login' : 'Sign Up'}
                        </button>
                        <p className="text-neutral-500 mt-12">
                            {variant === 'login' ? 'New here?' : 'Have an account?'}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === 'login' ? 'Create an account' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
