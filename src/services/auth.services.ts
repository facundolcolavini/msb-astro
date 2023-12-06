import { getOriginalNode } from "typescript";

export const register =async (username: string, email: string, password: string) => {

    /* Post a user on PAGES/API json astro register http://localhost:4321/api/register.json */
   const res = await fetch('https://sh-msb-dev.netlify.app/api/register.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, email: email, password: password }),
    });

    const data = await res.json();

    return data;
    
}

export const login = async (email: string, password: string) => {
    /* Post a user on PAGES/API json astro login http://localhost:4321/api/login.json */
   const res = await fetch('https://sh-msb-dev.netlify.app/api/login.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    });

    const data = await res.json();

    return data;
    
}