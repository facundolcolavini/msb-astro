import type { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { modalAuthPropertyStore, setModalAuth } from "@/store/modalsAuthStore";

interface AuthProps {
    children?: JSX.Element | JSX.Element[]
}

const AuthPage = ({ children }: AuthProps) => {
    const [modal, setModal] = useState(modalAuthPropertyStore.get());

    useEffect(() => {
        const unsubscribe = modalAuthPropertyStore.subscribe(setModal);
        return unsubscribe;
    }, []);

    const handleSwitchToRegister = (event:Event) => {
        event.preventDefault();
        event.stopPropagation();
        setModalAuth({ changeToLogin: false, changeToRegister: true });
    };
    
    const handleSwitchToLogin = (event:Event) => {
        event.preventDefault();
        event.stopPropagation();
        setModalAuth({ changeToLogin: true, changeToRegister: false });
    };

    return (
        <>
            {
                modal.changeToRegister ? (
                    <RegisterForm onSwitchToLogin={handleSwitchToLogin}>
                        <> {children}</>
                    </RegisterForm>
                ) : (
                    <LoginForm onSwitchToRegister={handleSwitchToRegister}>
                        <> {children}</>
                    </LoginForm>
                )
            }
        </>
    )
}

export default AuthPage;