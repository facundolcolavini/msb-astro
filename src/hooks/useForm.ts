import { useEffect, useMemo, useState } from 'preact/hooks';
import type { FormValidations, formCheckedValues } from '@/models/validations/forms.validations';



interface inputF {
    name: string,
    value: string
}

export const useForm = <T>(initialValues: T, formValidations: FormValidations = <FormValidations>{}) => {

    const [formState, setFormState] = useState<typeof initialValues>(initialValues);//{email: '', password: '', displayName: '',} RegisterUser = T
    const [formValidation, setValidations] = useState({} as formCheckedValues);
    const [changeFields, setChangeFields] = useState<Record<string, boolean>>({});

    useEffect(() => {
        createValidators()
    }, [formState])

    useEffect(() => {
        if (initialValues !== formState) setFormState(initialValues)
    }, [initialValues])

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue as keyof formCheckedValues] !== null) return false
        }
        return true
    }, [formValidation])



    // Actualiza la función onInputChange para marcar el campo como tocado
    const onInputChange = ({ target }: Event): void => {
        const { name, value }: inputF = target as HTMLInputElement;
        console.log(name, value)
        setChangeFields(prev => ({ ...prev, [name]: true }));
        setFormState(
            (prev: typeof initialValues) => ({
                ...prev, // Campos anteriores
                [name]: value // Valor del input o de campos {email: , password: , displayName:}
            })
        );
    };

    // OnUploadFile maneja el cambio de archivos en el input file y actualiza el estado
    const onUploadFile = (event: Event): void => {
        const [file] =  (event.target as HTMLInputElement).files ?? [];
        if(file){
            setFormState((prev: typeof initialValues) => ({...prev,  contactFile: file}));
            setChangeFields(prev => ({ ...prev, file: true }));
        }
            
            
    };

    const onResetForm = (): void => {
            setChangeFields({})
            setFormState(initialValues)
    }

    // Toma el objeto formValidations y crea un nuevo estado donde se va a saber si los inputs son validos o no
    const createValidators = () => {
        const formCheckedValues = {} as formCheckedValues // {emailValid: null | 'Error Mensaje']}
        // Recorro mi objeto formValidations 
        for (let formField in formValidations) { // email , password , displayName , contactFile

            const [fn, errorMessage] = formValidations[formField]; // Obtengo el Array de esa Key [fn,error]

            formCheckedValues[`${formField}Valid` as keyof formCheckedValues] = fn(formState[formField as keyof typeof initialValues]) ? null : errorMessage;
            setValidations(formCheckedValues)
        }
    }

    return {
        initialValues,
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        onUploadFile,
        ...formValidation,
        isFormValid,
        changeFields
    }
}