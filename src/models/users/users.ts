export type UserAccount = {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    phoneAlternative?: string;
    address?: string;
    street?:string;
    addressNumber?:string;
    location?: string;
    creationDate: number;
    lastUpdate: number;
 }

 export type UserChangePassword = {
    currentPassword: string;
    password: string;
    confirmPassword: string;
 }

export type UserPost= {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password:string;
}

export type UserEdit= {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password:string;
}

export type UserDelete= {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password:string;
}


/* AUTH  */
export interface UserLogin {
    email: string;
    password:string;
}

export interface UserRegister {
    email: string;
    password:string;
}
export const initLoginForm:UserLogin  = {
    email: '',
    password: '',
}

export const initRegisterForm:UserRegister = {
    email: '',
    password: '',
}


export const initUserChangePassword:UserChangePassword = {
    currentPassword: '',
    password: '',
    confirmPassword: '',
}