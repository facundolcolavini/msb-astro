import type { UserChangePassword } from "../users/users";


export interface FormValidations {
  [key: string]: any;
}

export interface formCheckedValues {
  usernameValid: null | string;
  firstNameValid: null | string;
  lastNameValid: null | string;
  emailValid: null | string;
  passwordValid: null | string;
  phoneValid: null | string;
  phoneAlternativeValid: null | string;
  addressValid: null | string;
  streetValid: null | string;
  addressNumberValid: null | string;
  locationValid: null | string;
  contactNameValid: null | string;
  contactLastNameValid: null | string;
  contactEmailValid: null | string;
  contactPhoneValid: null | string;
  contactMessageValid: null | string;
  contactFileValid: null | File;
  currentPasswordValid: null | string;
  confirmPasswordValid: null | string;
}


export const formRegisterValidator = {
  email: [
    (value: string): boolean => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.trim()),
    'El correo debe tener un formato válido'
  ],
  password: [(value: string): boolean => value.length >= 1, 'La contraseña es requerida'],
  /*   confirmPassword: [(value: string): boolean => value.length >= 1, 'La confirmación de password es requerida'], */
}

export const formLoginValidator = {
  email: [
    (value: string): boolean => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.trim()),
    'El correo debe tener un formato válido'
  ],
  password: [(value: string): boolean => value.length >= 1, 'La contraseña es requerida'],
}

export const formContactValidator = {
  contactName: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El nombre es requerido y solo puede contener letras y espacios'
  ],
  contactEmail: [
    (value: string): boolean => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.trim()),
    'El correo debe tener un formato válido'
  ],
  contactPhone: [
    (value: string): boolean => /^\d{7,15}$/.test(value.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  contactMessage: [
    (value: string): boolean => value.trim().length >= 1,
  ],
};


export const formContactReviewValidator = {
  contactName: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El nombre es requerido y solo puede contener letras y espacios'
  ],
  contactLastName: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El nombre es requerido y solo puede contener letras y espacios'
  ],
  contactEmail: [
    (value: string): boolean => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.trim()),
    'El correo debe tener un formato válido'
  ],
  contactPhone: [
    (value: string): boolean => /^\d{7,15}$/.test(value.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  contactMessage: [
    (value: string): boolean => value.trim().length >= 1,
  ],
};


export const formContactAppraisalsValidator = {
  contactName: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El nombre es requerido y solo puede contener letras y espacios'
  ],
  contactLastName: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El nombre es requerido y solo puede contener letras y espacios'
  ],
  contactEmail: [
    (value: string): boolean => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.trim()),
    'El correo debe tener un formato válido'
  ],
  contactPhone: [
    (value: string): boolean => /^\d{7,15}$/.test(value.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  contactMessage: [
    (value: string): boolean => value.trim().length >= 1,
  ],
};

export const formContactAdministrationValidator = {
  contactName: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El nombre es requerido y solo puede contener letras y espacios'
  ],
  contactLastName: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El nombre es requerido y solo puede contener letras y espacios'
  ],
  contactEmail: [
    (value: string): boolean => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.trim()),
    'El correo debe tener un formato válido'
  ],
  contactPhone: [
    (value: string): boolean => /^\d{7,15}$/.test(value.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  contactMessage: [
    (value: string): boolean => value.trim().length >= 1,
  ],
};

export const formContactJoinValidator = {
  contactName: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El nombre es requerido y solo puede contener letras y espacios'
  ],
  contactLastName: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El nombre es requerido y solo puede contener letras y espacios'
  ],
  contactEmail: [
    (value: string): boolean => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.trim()),
    'El correo debe tener un formato válido'
  ],
  contactPhone: [
    (value: string): boolean => /^\d{7,15}$/.test(value.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  contactMessage: [
    (value: string): boolean => value.trim().length >= 1,
  ],
  contactFile: [
    (value: File | undefined): boolean => {
      if (!value) {
        return false; // o true, dependiendo de si quieres que el campo sea opcional o no
      }
      return value.type === 'application/pdf' || value.type === 'application/msword' || value.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    },
    'El archivo debe ser un PDF o un documento de Word (.doc o .docx)'
  ]
};

export const formUserValidator = {
  firstName: [
    (value: string): boolean =>   /^[a-zA-Z\s]+$/.test(value!.trim()),
    'El nombre es requerido '
  ],
  lastName: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value!.trim()),
    'El apellido es requerido '
  ],
  phone: [
    (value: string): boolean => /^\d{7,15}$/.test(value!.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  phoneAlternative: [
    (value: string): boolean => /^\d{7,15}$/.test(value?.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  address: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value!.trim()),
    'La dirección es requerida'
  ],
  street: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value!.trim()),
    'La calle es requerida '
  ],
  addressNumber: [
    (value: string): boolean => /^\d{1,5}$/.test(value!.trim()),
    'El número de dirección es requerido '
  ],
  location: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value!.trim()),
    'La localidad es requerida '
  ],
} 

export const formChangePasswordValidator = {
  currentPassword: [
    (value: string): boolean => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
    'Contraseña actual inválida'
  ],
  password: [
    (value: string): boolean => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
    'Contraseña inválida'
  ],
  confirmPassword: [
    (confirmPassword: string, formState: any): boolean => {
      const passwordMatch = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(confirmPassword);
      const passwordEqual = formState.password === confirmPassword;
      return passwordMatch && passwordEqual;
    },
    'Confirmación de contraseña inválida o no coincide con la contraseña'
  ]
}

// Asumiendo que formChangePasswordValidator se ve algo así:
export const formPasswordEqual = (values: UserChangePassword) => {
  const errors: Partial<UserChangePassword> = {};

  // Validaciones individuales
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.currentPassword)) {
    errors.currentPassword = 'Contraseña actual inválida';
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)) {
    errors.password = 'Contraseña inválida';
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.confirmPassword)) {
    errors.confirmPassword = 'Confirmación de contraseña inválida';
  }

  // Verificación adicional para asegurarse de que password y confirmPassword son iguales
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'La contraseña y la confirmación de la contraseña deben coincidir';
  }

  return errors;
};