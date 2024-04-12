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