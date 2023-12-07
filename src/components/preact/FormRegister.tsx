import { navigate } from 'astro:transitions/client';
import { useState } from 'preact/hooks';
import type { JSX } from "preact/jsx-runtime";
import Toast from './Toasts/Toast';


interface FormState {
    username: string;
    email: string;
    password: string;
}

const FormRegister: preact.FunctionalComponent = () => {
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'danger' | 'warning'>('success');


    const [form, setForm] = useState<FormState>({
        username: '',
        email: '',
        password: ''
    });


    const handleChange: JSX.GenericEventHandler<HTMLElement> = (e) => {
        const { id, value } = e.target as HTMLInputElement;
        setForm({ ...form, [id]: value });
    };

    const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form);
        try {
            const ok = { status: 201, message: 'Usuario creado correctamente' }
            console.log(ok)
            if (ok.status === 201) {
                setToastMessage(ok.message);
                setToastType('success');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                throw ok
            }

        }
        catch (err: any) {
            console.log(err)
            setToastMessage(err.message);
            setToastType('warning');
        }

    };

    const closeToast = () => {
        setToastMessage('');
    };


    return (
        <>
            <form class="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4" onSubmit={handleSubmit}>
                <div class="rounded-lg border shadow-sm w-full max-w-md mx-auto bg-gray-700 text-white" data-v0-t="card">
                    <div class="flex flex-col space-y-1.5 p-6">
                        <h3 class="font-semibold tracking-tight text-2xl">Registrarse</h3>
                        <p class="text-sm text-muted-foreground">Crea una cuenta para acceder a nuestros servicios.</p>
                    </div>
                    <div class="p-6 space-y-4">
                        <div class="space-y-2">
                            <label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="username"
                            >
                                Nombre de usuario
                            </label>
                            <input
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-black"
                                id="username"
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                        <div class="space-y-2">
                            <label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="email"
                            >
                                Correo electrónico
                            </label>
                            <input
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-black"
                                id="email"
                                onChange={handleChange}
                                type="email"
                            />
                        </div>
                        <div class="space-y-2">
                            <label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="password"
                            >
                                Contraseña
                            </label>
                            <input
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-black"
                                id="password"
                                required={true}
                                onChange={handleChange}
                                type="password"
                            />
                        </div>
                    </div>
                    <div class="p-6 flex justify-between items-center">
                        <button
                            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-1/2 bg-blue-500 text-white hover:bg-blue-700"
                            type="submit"
                        >
                            Registrarse
                        </button>
                        <a class="underline text-blue-500 hover:text-blue-700" href="#">
                            ¿Ya tienes una cuenta?
                        </a>
                    </div>
                </div>
            </form>
            {toastMessage && <Toast type={toastType} message={toastMessage} onClose={closeToast} />}
        </>
    )
}

export default FormRegister