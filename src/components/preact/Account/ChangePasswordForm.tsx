import { useForm } from "@/hooks/useForm";
import { initUserChangePassword, type UserChangePassword } from "@/models/users/users";
import { formChangePasswordValidator } from "@/models/validations/forms.validations";
import { useState } from "preact/hooks";
import IconCheckCircle from "../Icons/CheckIcon";
import ErrorIcon from "../Icons/ErrorIcon";
import WarningAlertIcon from "../Icons/WarningAlertIcon";
import Spinner from "../Spinner";
import Button from "../ui/Buttons/Button";
import InputField from "../ui/Inputs/InputField";

const ChangePasswordForm = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        isFormValid,
        changeFields,
        password,
        passwordValid,
        confirmPassword,
        confirmPasswordValid,
        currentPassword,
        currentPasswordValid,
        onInputChange,
        onResetForm
    } = useForm<UserChangePassword>(initUserChangePassword, formChangePasswordValidator);
    /*     console.log(formPasswordEqual({
            currentPassword,
            password,
            confirmPassword
            
        })) */
    const onChangePassword = async (e: SubmitEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const values = Object.fromEntries(formData);
        console.log(values)
        try {
            setFormSubmitted(true);
            const response = true /* await fetch(`/api/signin.json/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(values)
                }
            ) */
            const data = { success: true, message: 'OK' }/* await response.json() */
            if (!data.success) {
                setFormSubmitted(false)
                /*    setFormError(true); */
                throw data
            } else {
                setFormSubmitted(false);
                /*  setToastMsg(data.message); */
                /*  navigate(window.location.pathname); */
                onResetForm();
                /*  setModalAuth({ changeToLogin: false, changeToRegister: false }); */
            }

        } catch (e) {
            /* setToastMsg((e as Error).message); */
            setFormSubmitted(false);
        }
    };

    const inputsValids = {
        password: passwordValid,
        confirmPassword: confirmPasswordValid,
        currentPassword: currentPasswordValid

    }
    // Recorre cada campo en changeFields
    const fieldsChangedAndValid = Object.entries(changeFields).every(([key, value]) => {
        // Verifica si el campo ha cambiado
        if (value) {
            // Si el campo ha cambiado, verifica si es válido
            return inputsValids[key as keyof typeof inputsValids] === null;
        }
        // Si el campo no ha cambiado, considera que es válido
        return true;
    });

    return (
        <form noValidate onSubmit={onChangePassword} className={'px-5'} >
            <p className={'text-primary-text-msb font-bold text-xl my-7'}>Cambiar contraseña</p>
            <div className={'grid grid-cols md:grid-cols-1 gap-4 lg:grid-cols-3'}>
                <div className={'space-y-5 h-full'}>
                    <InputField label="Contraseña actual" value={currentPassword} onChange={onInputChange} icon={currentPasswordValid === null
                        ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                        : !currentPasswordValid ? <ErrorIcon addStyles="stroke-red-500" /> :
                            <></>} success={currentPasswordValid === null} error={changeFields?.currentPassword} addStyles="h-12 w-100" name="currentPassword" id="currentPassword" type="password" />
                    {(changeFields?.currentPassword && currentPasswordValid)
                        && <label htmlFor="currentPassword" className="text-xs px-2 mx-2 font-thin text-red-700">{currentPasswordValid}</label>}
                </div>
                <div className={'space-y-5 h-full'}>
                    <InputField label="Contraseña" value={password} onChange={onInputChange} icon={passwordValid === null
                        ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                        : !passwordValid ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={passwordValid === null} error={changeFields?.password} addStyles="h-12 w-100" name="password" id="password" type="password" />
                    {(changeFields?.password && passwordValid)
                        && <label htmlFor="password" className="text-xs px-2 mx-2 font-thin text-red-700">{passwordValid}</label>}
                </div>
                <div className={'space-y-5 h-full'}>
                    <InputField label="Repetir contraseña" value={confirmPassword} onChange={onInputChange} icon={confirmPasswordValid === null
                        ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                        : !confirmPasswordValid ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={confirmPasswordValid === null} error={changeFields?.confirmPassword} addStyles="h-12 w-100" name="confirmPassword" id="confirmPassword" type="password" />
                    {(changeFields?.confirmPassword && confirmPasswordValid)
                        && <label htmlFor="confirmPassword" className="text-xs px-2 mx-2 font-thin text-red-700">{confirmPasswordValid}</label>}
                </div>
                <div className={'flex justify-center gap-2 md:justify-end lg:justify-end font-bold h-fit w-full bg-gr px-5 text-pretty p-3 rounded border border-primary-msb'}>
                    <WarningAlertIcon addStyles={'size-8 flex items-center justify-center fill-white'} />
                    <p className="text-black  text-xs">{
                        'La contraseña actual es requerida y debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.'
                    }</p></div>
                </div>
            <div className={' lg:col-span-2  flex justify-center md:justify-end lg:justify-end h-full'}>
                <Button variant={`${fieldsChangedAndValid ? "primary" : "disabled"}`} addStyles="mt-5 flex py-6 text-center justify-center w-full lg:text-center py-12 md:w-fit lg:w-fit py-2 px-8 h-full gap-2 items-center  text-base  text-white border border-gray-400" type="submit"><span>Guardar Cambios</span> {formSubmitted && isFormValid && <Spinner />}</Button>
            </div>
            <hr className={' divide-y-2 divide-gray-800 my-5'} />
        </form>
    )
}

export default ChangePasswordForm