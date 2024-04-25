

export interface FormValidations {
  [key: string]: any;
}

export interface formCheckedValues {
  displayNameValid: null | string;
  emailValid: null | string;
  contactNameValid: null | string;
  contactLastNameValid: null | string;
  contactEmailValid: null | string;
  contactPhoneValid: null | string;
  contactMessageValid: null | string;
  passwordValid: null | string;
  contactFileValid: null | File;
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