import { useForm } from "@/hooks/useForm";
import { initContactReviewForm, type ContactReviewForm } from "@/models/reviews/reviews";
import { formContactReviewValidator } from "@/models/validations/forms.validations";
import { setModalAuth } from "@/store/modalsAuthStore";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import { useState } from "preact/hooks";
import IconCheckCircle from "../Icons/CheckIcon";
import ErrorIcon from "../Icons/ErrorIcon";
import Spinner from "../Spinner";
import Button from "../ui/Buttons/Button";
import InputField from "../ui/Inputs/InputField";

const FormContact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const {
    isFormValid,
    changeFields,
    contactEmail,
    contactEmailValid,
    contactName,
    contactNameValid,
    contactLastName,
    contactLastNameValid,
    contactPhone,
    contactPhoneValid,
    contactMessage,
    contactMessageValid,
    onInputChange,
    onResetForm
  } = useForm<ContactReviewForm>(initContactReviewForm, formContactReviewValidator);

  const login = async (e: SubmitEvent) => {
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
        navigate(window.location.pathname);
        onResetForm();
        setModalAuth({ changeToLogin: false, changeToRegister: false });
      }

    } catch (e) {
      setToastMsg((e as Error).message);
      setFormSubmitted(false);
    }
  };

  return (
    <>
      <h1 className={'font-bold  text-center mx-auto px-6 pt-5'}>INICIAR SESIÓN</h1>
      <div className={'p-4 md:px-6 lg:px-5 h-fit'}>
        <form className="grid grid-cols text-start gap-3 h-fit font-thin font-gotham" noValidate onSubmit={login}>
          <InputField label="contactEmail" value={contactEmail} onChange={onInputChange} icon={contactEmailValid === null
            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
            : changeFields?.contactEmail === true ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={contactEmailValid === null} error={changeFields?.contactEmail} addStyles="h-12" name="contactEmailValid" id="contactEmailValid" type="email" />
          {(changeFields?.contactEmail && contactEmailValid)
            ? <label htmlFor="contactEmail" className="text-xs px-2 mx-2 font-thin text-red-700">{contactEmailValid}</label>
            : <label htmlFor="contactEmail" className="text-xs px-2 mx-2 text-gray-400">Ingresá tu email</label>}
          <InputField label="Contraseña" type="password" value={contactName} onChange={onInputChange} icon={contactNameValid === null ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} /> : changeFields?.contactName === true ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={contactNameValid === null} error={changeFields?.password} addStyles="h-12" name="contactName" id="contactName" />
          {(changeFields?.password && contactNameValid)
            ? <label htmlFor="password" className="text-xs px-2  mx-2 font-thin text-red-700">{contactNameValid}</label>
            : <label htmlFor="password" className="text-xs px-2 mx-2 text-gray-400">Ingresá tu contraseña</label>}
          <hr className={'divide-x-2 divide-slate-800 mx-2'} />
          {formError && <div className="flex gap-2  py-3 px-3 text-sm z-10 border border-red-500 rounded bg-red-200 ">{toastMsg}</div>}
          <div className={'flex justify-center items-center gap-2'}>
{/*             <Button variant="outline" addStyles="w-full py-1 px-5  hover:bg-bg-2-msb hover:text-white" type="button" onClick={onSwitchToRegister}> Crear cuenta</Button> */}
            <Button variant={`${isFormValid ? "primary" : "disabled"}`} addStyles="flex w-full py-1 px-5  gap-2 justify-center text-white border border-gray-400" type="submit"><span>Iniciar Sesión</span> {formSubmitted && isFormValid && <Spinner />}</Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default FormContact