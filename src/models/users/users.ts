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
    username: string;
    password:string;
}

export interface UserRegister {
    username: string;
    password:string;
    confirmPassword:string;
}
export const initLoginForm:UserLogin  = {
    username: '',
    password: '',
}

export const initRegisterForm:UserRegister = {
    username: '',
    password: '',
    confirmPassword: ''
}