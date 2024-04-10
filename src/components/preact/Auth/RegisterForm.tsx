import { useForm } from "@/hooks/useForm";
import { initLoginForm, type UserLogin } from "@/models/users/users";
import { formLoginValidator } from "@/models/validations/forms.validations";
import { navigate } from "astro:transitions/client";
import type { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import IconCheckCircle from "../Icons/CheckIcon";
import ErrorIcon from "../Icons/ErrorIcon";
import Spinner from "../Spinner";
import Button from "../ui/Buttons/Button";
import InputField from "../ui/Inputs/InputField";
import { Modal } from "../ui/Modals/Modal";

interface Props {
    children: JSX.Element | JSX.Element[];
    fnToggleModalType: () => void;
}

const RegisterForm = ({fnToggleModalType,children }: Props) => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [formError, setFormError] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const {
        isFormValid,
        changeFields,
        username,
        password,
        usernameValid,
        passwordValid,
        onInputChange,
        onResetForm
    } = useForm<UserLogin>(initLoginForm, formLoginValidator);

    const toggleModal = () => {
        setModalState((prev) =>
            !prev
        );
    };

/*     useEffect(() => {
        if (formError) {
            setTimeout(() => {
                setFormError(false);
            }, 3000);
        }
    }, [toastMsg, setToastMsg]) */

    const login = async (e: SubmitEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const values = Object.fromEntries(formData);
        // agregar al formData el id el tipo desde y codsud

        try {
            setFormSubmitted(true);

            const response = await fetch(`/api/signup.json/`,
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
                throw data
            } else {
                console.log(data, 'data client')
                setFormSubmitted(false);
                setToastMsg(data.message);
                toggleModal && toggleModal();
                navigate(window.location.pathname);
                onResetForm();
            }

        } catch (e) {
            setToastMsg((e as Error).message);
            setFormSubmitted(false);
        }
    };
    return (
        <>
            {modalState && (
                <Modal
                    header={<div className={'flex justify-center  text-center items-center place-content-center p-3 relative'}><img src={`/images/logo.png`} className={'w-100 text-center self-center place-items-middle'} width={140} height={40} /></div>}
                    footer=""
                    addStyles="bg-secondary-bg-msb shadow-lg  rounded w-11/12 md:max-w-md mx-auto transform transition-transform duration-300"
                    onHeaderCloseClick={toggleModal}
                    onBackdropClick={toggleModal}
                >
                    <h1 className={'font-bold  text-center mx-auto px-6 pt-5'}>CREAR CUENTA</h1>
                    <div className={'p-4 md:px-6 lg:px-5 h-fit'}>
                        <form className="grid grid-cols text-start gap-3 h-fit font-thin font-gotham" noValidate onSubmit={login}>
                            <InputField label="Nombre de usuario" value={username} onChange={onInputChange} icon={usernameValid === null
                                ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                                : changeFields?.username === true ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={usernameValid === null} error={changeFields?.username} addStyles="h-12" name="username" id="username" type="text" />
                            {(changeFields?.username && usernameValid)
                                ? <label htmlFor="username" className="text-xs px-2 mx-2 font-thin text-red-700">{usernameValid}</label>
                                : <label htmlFor="username" className="text-xs px-2 mx-2 text-gray-400">Ingresá tu nombre de usuario</label>}
                            <InputField label="Contraseña" type="password" value={password} onChange={onInputChange} icon={passwordValid === null ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} /> : changeFields?.password === true ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={passwordValid === null} error={changeFields?.password} addStyles="h-12" name="password" id="password" />
                            {(changeFields?.password && passwordValid)
                                ? <label htmlFor="password" className="text-xs px-2  mx-2 font-thin text-red-700">{passwordValid}</label>
                                : <label htmlFor="password" className="text-xs px-2 mx-2 text-gray-400">Ingresá tu contraseña</label>}
                            <hr className={'divide-x-2 divide-slate-800 mx-2'} />
                            {formError && <div className="flex gap-2  py-3 px-3 text-sm z-10 border border-red-500 rounded bg-red-200 ">{toastMsg}</div>}
                            <div className={'flex justify-center items-center gap-2'}>
                                <Button variant="outline" addStyles="w-full py-1 px-5  hover:bg-bg-2-msb hover:text-white" onClick={fnToggleModalType}> Iniciar Sesión</Button>
                                <Button variant={`${isFormValid ? "primary" : "disabled"}`} addStyles="w-full py-1 px-5 text-white border border-gray-400" type="submit">Iniciar Sesión {formSubmitted && isFormValid && <Spinner />}</Button>
                            </div>
                        </form>


                    </div>
                </Modal>

            )
            }
            <button onClick={toggleModal}>
                {children}
            </button>

        </>
    )
}

export default RegisterForm