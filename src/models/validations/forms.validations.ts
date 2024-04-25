

export interface FormValidations {
  [key: string]: any;
}

export interface formCheckedValues {
  usernameValid: null | string;
  firstnameValid: null | string;
  lastnameValid: null | string;
  emailValid: null | string;
  passwordValid: null | string;
  confirmpasswordValid: null | string;
  phoneValid: null | string;
  locationValid: null | string;
  contactNameValid: null | string;
  contactLastNameValid: null | string;
  contactEmailValid: null | string;
  contactPhoneValid: null | string;
  contactMessageValid: null | string;
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

export const formUserValidator = {
  username: [ (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
  'El nombre de usuario es requerido y solo puede contener letras y espacios'],
  firstname:[
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El nombre es requerido y solo puede contener letras y espacios'
  ],
  lastname:[
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El apellido es requerido y solo puede contener letras y espacios'
  ],
  email: [
    (value: string): boolean => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.trim()),
    'El correo debe tener un formato válido'
  ],
  password: [
    (value: string): boolean => {
      const hasEightCharacters = /.{8,}/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialCharacter = /[!@#$%^&*]/.test(value);
      return hasEightCharacters && hasLowerCase && hasUpperCase && hasNumber && hasSpecialCharacter;
    },
    'La contraseña debe tener al menos 8 caracteres, contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (por ejemplo: !@#$%^&*)'
  ],
  confirmpassword: [
    (value: string, formValues: any): boolean => value === formValues.password,
    'Las contraseñas no coinciden'
  ],
  phone:[
    (value: string): boolean => /^\d{7,15}$/.test(value.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  location:[ (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
  'La localidad es requerida y solo puede contener letras y espacios'],
} 