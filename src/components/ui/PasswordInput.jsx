import { useState } from 'react';
import { EyeSlashIcon } from '@heroicons/react/20/solid';

const PasswordInput = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div>
            <div className="mt-1 relative">
                <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    placeholder="Contraseña"
                    className="block w-full bg-gradient-to-tr from-[#40BBD6] to-[#000] border-none appearance-none rounded-md border px-3 py-4 placeholder-gray-50 shadow-sm focus:outline-none sm:text-sm pr-12"
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent rounded-md"
                    onClick={togglePasswordVisibility}
                >
                    <EyeSlashIcon className="h-5 w-5 text-black" />
                </button>
            </div>
        </div>
    );
};
export default PasswordInput;