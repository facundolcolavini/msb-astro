import { useForm } from "@/hooks/useForm";
import { initLoginForm, type UserLogin } from "@/models/users/users";
import { formLoginValidator } from "@/models/validations/forms.validations";
import type { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import ErrorIcon from "../Icons/ErrorIcon";
import OkIcon from "../Icons/OkIcon";
import WarningAlertIcon from "../Icons/WarningAlertIcon";
import Spinner from "../Spinner";
import Button from "../ui/Buttons/Button";
import InputField from "../ui/Inputs/InputField";
import { Modal } from "../ui/Modals/Modal";
import { Toast } from "../ui/Toast/Toast";
import { navigate } from "astro:transitions/client";

interface Props {
    children: JSX.Element | JSX.Element[];

}

const LoginForm = ({ children }: Props) => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [formError, setFormError] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const {
        isFormValid,
        changeFields,
        username,
        password,
        loginUsernameValid,
        loginPasswordValid,
        onInputChange,
        onResetForm
    } = useForm<UserLogin>(initLoginForm, formLoginValidator);

    const toggleModal = () => {
        setModalState( !modalState);
    };

    useEffect(() => {
        if(formSubmitted && isFormValid){
            toggleModal()
          
        }
        
        return  ()  => {
            navigate(window.location.pathname);
        }
     } , [formSubmitted])

    const sendContactForm = async (e: SubmitEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const values = Object.fromEntries(formData);
        // agregar al formData el id el tipo desde y codsud
        console.log(values)

        try {
            setFormSubmitted(true);
            const response = await fetch(`/api/signin`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                }
            )
            const data = await response.json()
            console.log(data, 'data client')
            if (!data.success) {
                setFormSubmitted(false)
                setFormError(true);
                setToastMsg(data.message)
            } else {
                setFormSubmitted(false);
                setToastMsg(data.message)
                setModalState(false)
                onResetForm();
               
            }

        } catch (e) {
            /* setErroMsg((e as unknown)?.message); */
            setFormSubmitted(false);
        }
    };

    return (
        <>
            {modalState ? (
                <Modal
                    header="Iniciar sesión"
                    footer=""
                    onHeaderCloseClick={toggleModal}
                    onBackdropClick={toggleModal}
                >
                    <form className="grid grid-cols text-start gap-3 h-fit" noValidate onSubmit={sendContactForm}>
                        <InputField value={username} onChange={onInputChange} icon={loginUsernameValid === null ? <OkIcon /> : changeFields?.username === true ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={loginUsernameValid === null} error={changeFields?.username} addStyles="h-12" name="username" id="username" type="text" placeholder="*Nombre de usuario" />
                        {(changeFields?.username && loginUsernameValid) && <label htmlFor="username" className="text-xs px-2 font-thin text-red-700">{loginUsernameValid}</label>}
                        <InputField type="password" value={password} onChange={onInputChange} icon={loginPasswordValid === null ? <OkIcon /> : changeFields?.password === true ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={loginPasswordValid === null} error={changeFields?.password} addStyles="h-12" name="password" id="password" placeholder="*Contraseña" />
                        {(changeFields?.password && loginPasswordValid) && <label htmlFor="password" className="text-xs px-2 font-thin text-red-700">{loginPasswordValid}</label>}
                        <Button variant={`${isFormValid ? "primary" : "disabled"}`} addStyles={`text-white transition-all h-14 text-sm md:text-md lg:text-lg border-gray-50 flex justify-center items-center gap-3`} type="submit">Iniciar{formSubmitted && isFormValid && <Spinner />}</Button>
                    </form>
                </Modal>
            ) : (null)
            }
            <button onClick={toggleModal}>

                {children}
            </button>
            {isFormValid && !formError && <Toast message={toastMsg} isVisible={formSubmitted} icon={<WarningAlertIcon />} customStyles="flex gap-2 border-2 border-primary-border-msb bg-[#EFF0F2]" duration={3000} />}
            {formError && <Toast message={toastMsg} isVisible={formError} icon={<WarningAlertIcon />} customStyles="flex gap-2 border-2 border-red-500 bg-[#EFF0F2]" duration={3000} />}
        </>
    )
}

export default LoginForm