import type { JSX } from "preact";
import { useState } from "preact/hooks";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthProps {
    children?: JSX.Element | JSX.Element[]

}
const AuthPage = ({ children }: AuthProps) => {
    const [toggleTypeModal, setToggleTypeModal] = useState(false) // true - Register / false -Login
    console.log(toggleTypeModal)
    const handleToggle = () => {
        setToggleTypeModal((prev) => !prev)
    }
    return (
        <>
            {
                toggleTypeModal ? (
                    <RegisterForm fnToggleModalType={handleToggle}>
                        <> {children}</>
                    </RegisterForm>
                ) : (
                    <LoginForm fnToggleModalType={handleToggle}>
                        <> {children}</>
                    </LoginForm>
                )
            }
        </>
    )
}

export default AuthPage;