import { useForm } from "@/hooks/useForm";
import type { User } from "@/models/users/users";
import { formUserValidator } from "@/models/validations/forms.validations";
import { useState } from "preact/hooks";
import IconCheckCircle from "../Icons/CheckIcon";
import ErrorIcon from "../Icons/ErrorIcon";
import UserIcon from "../Icons/UserIcon";
import InputField from "../ui/Inputs/InputField";
import Button from "../ui/Buttons/Button";
import Spinner from "../Spinner";

interface Props {
    userData: User
}
const AccountForm = ({ userData }: Props) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const {
        isFormValid,
        changeFields,
        username,
        usernameValid,
        firstname,
        firstnameValid,
        lastname,
        lastnameValid,
        email,
        emailValid,
        phone,
        phoneValid,
        location,
        locationValid,
        password,
        passwordValid,
        confirmpassword,
        confirmpasswordValid,
        onInputChange,
        onResetForm
    } = useForm<User>(userData, formUserValidator);

    const updateUser = async (e: SubmitEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const values = Object.fromEntries(formData);

        try {
            setFormSubmitted(true);
            const response = await fetch(`/api/signin.json/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(values)
                }
            )
            const data = await response.json()
            if (!data.success) {
                setFormSubmitted(false)
                setFormError(true);
                throw data
            } else {
                setFormSubmitted(false);
                setToastMsg(data.message);
                /*  navigate(window.location.pathname); */
                onResetForm();
                /*  setModalAuth({ changeToLogin: false, changeToRegister: false }); */
            }

        } catch (e) {
            setToastMsg((e as Error).message);
            setFormSubmitted(false);
        }
    };
    console.log(changeFields)
    return (
        <div>
            <form className="font-gotham mx-auto" noValidate onSubmit={updateUser}>
                <p className={'text-primary-text-msb font-bold text-xl mb-7'}>Datos personales</p>
                <div className={'grid grid-cols md:grid-cols-1 gap-4 lg:grid-cols-3'}>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="Nombre de usuario" value={username} onChange={onInputChange} icon={usernameValid === null
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : changeFields?.username === true ? <ErrorIcon addStyles="stroke-red-500" /> : <UserIcon className={'flex size-5 mx-2 justify-center items-center h-100 fill-secondary-text-msb self-center place-content-center'} />} success={usernameValid === null} error={changeFields?.username} addStyles="h-12 w-100" name="username" id="username" type="text" />
                        {(changeFields?.username && usernameValid)
                            && <label htmlFor="username" className="text-xs px-2 mx-2 font-thin text-red-700">{usernameValid}</label>}
                    </div>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="Nombre" value={firstname} onChange={onInputChange} icon={firstnameValid === null
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : changeFields?.firstname === true ? <ErrorIcon addStyles="stroke-red-500" /> : <UserIcon className={'flex size-5 mx-2 justify-center items-center h-100 fill-secondary-text-msb self-center place-content-center'} />} success={firstnameValid === null} error={changeFields?.firstname} addStyles="h-12 w-100" name="firstname" id="firstname" type="text" />
                        {(changeFields?.firstname && firstnameValid)
                            && <label htmlFor="firstname" className="text-xs px-2 mx-2 font-thin text-red-700">{firstnameValid}</label>}
                    </div>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="Apellido" value={lastname} onChange={onInputChange} icon={lastnameValid === null
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : changeFields?.lastname === true ? <ErrorIcon addStyles="stroke-red-500" /> : <UserIcon className={'flex size-5 mx-2 justify-center items-center h-100 fill-secondary-text-msb self-center place-content-center'} />} success={lastnameValid === null} error={changeFields?.lastname} addStyles="h-12 w-100" name="lastname" id="lastname" type="text" />
                        {(changeFields?.lastname && lastnameValid)
                            && <label htmlFor="lastname" className="text-xs px-2 mx-2 font-thin text-red-700">{lastnameValid}</label>}
                    </div>
                </div>
                <hr className={' divide-y-2 divide-gray-800 my-5'} />
                <p className={'text-primary-text-msb font-bold text-xl my-7'}>Datos de Contacto</p>
                <div className={'grid grid-cols md:grid-cols-1 gap-4 lg:grid-cols-3'}>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="E-mail" value={email} onChange={onInputChange} icon={emailValid === null
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : changeFields?.email === true ? <ErrorIcon addStyles="stroke-red-500" /> : <UserIcon className={'flex size-5 mx-2 justify-center items-center h-100 fill-secondary-text-msb self-center place-content-center'} />} success={emailValid === null} error={changeFields?.email} addStyles="h-12 w-100" name="email" id="email" type="text" />
                        {(changeFields?.email && emailValid)
                            && <label htmlFor="email" className="text-xs px-2 mx-2 font-thin text-red-700">{emailValid}</label>}
                    </div>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="Teléfono" value={phone} onChange={onInputChange} icon={phoneValid === null
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : changeFields?.phone === true ? <ErrorIcon addStyles="stroke-red-500" /> : <UserIcon className={'flex size-5 mx-2 justify-center items-center h-100 fill-secondary-text-msb self-center place-content-center'} />} success={phoneValid === null} error={changeFields?.phone} addStyles="h-12 w-100" name="phone" id="phone" type="text" />
                        {(changeFields?.phone && phoneValid)
                            && <label htmlFor="phone" className="text-xs px-2 mx-2 font-thin text-red-700">{phoneValid}</label>}
                    </div>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="Localidad" value={location} onChange={onInputChange} icon={locationValid === null
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : changeFields?.location === true ? <ErrorIcon addStyles="stroke-red-500" /> : <UserIcon className={'flex size-5 mx-2 justify-center items-center h-100 fill-secondary-text-msb self-center place-content-center'} />} success={locationValid === null} error={changeFields?.location} addStyles="h-12 w-100" name="location" id="location" type="text" />
                        {(changeFields?.location && locationValid)
                            && <label htmlFor="location" className="text-xs px-2 mx-2 font-thin text-red-700">{locationValid}</label>}
                    </div>
                </div>
                <hr className={' divide-y-2 divide-gray-800 my-5'} />
                <p className={'text-primary-text-msb font-bold text-xl my-7'}>Contraseña</p>
                <div className={'grid grid-cols md:grid-cols-1 gap-4 lg:grid-cols-3'}>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="Contraseña" value={password} onChange={onInputChange} icon={passwordValid === null
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : changeFields?.password === true ? <ErrorIcon addStyles="stroke-red-500" /> : <UserIcon className={'flex size-5 mx-2 justify-center items-center h-100 fill-secondary-text-msb self-center place-content-center'} />} success={passwordValid === null} error={changeFields?.password} addStyles="h-12 w-100" name="password" id="password" type="password" />
                        {(changeFields?.password && passwordValid)
                            && <label htmlFor="password" className="text-xs px-2 mx-2 font-thin text-red-700">{passwordValid}</label>}
                    </div>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="Repetir contraseña" value={confirmpassword} onChange={onInputChange} icon={confirmpasswordValid === null
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : changeFields?.confirmpassword === true ? <ErrorIcon addStyles="stroke-red-500" /> : <UserIcon className={'flex size-5 mx-2 justify-center items-center h-100 fill-secondary-text-msb self-center place-content-center'} />} success={confirmpasswordValid === null} error={changeFields?.confirmpassword} addStyles="h-12 w-100" name="confirmpassword" id="confirmpassword" type="password" />
                        {(changeFields?.confirmpassword && confirmpasswordValid)
                            && <label htmlFor="confirmpassword" className="text-xs px-2 mx-2 font-thin text-red-700">{confirmpasswordValid}</label>}
                    </div>
                   
                </div>
                <div className={'mt-20 flex justify-center items-center gap-2 mx-auto'}>
                        <Button variant="outline" addStyles="w-fit py-2 px-8  hover:bg-bg-2-msb hover:text-white" type="button"/*  onClick={onSwitchToRegister} */> Eliminar cuenta</Button>
                        <Button variant={"primary"} addStyles="flex w-fit py-2 px-8  gap-2 justify-center text-white border border-gray-400" type="submit"><span>Guardar Cambios</span> {formSubmitted && isFormValid && <Spinner />}</Button>
                    </div>
            </form>
        </div>
    )
}

export default AccountForm
