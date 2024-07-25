import { Login } from '@/types/auth/login';
import { Verification } from './auth/varification';


export type ILogin = {
    phone: string
    id: string,
}

export type IVerification = Verification