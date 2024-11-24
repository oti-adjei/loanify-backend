



export function sanitizeInput<T>(input: T | undefined): T | null {
    return input === undefined ? null : input;
}

export type NullableString = (string | null | undefined);

export interface UserAccountEmail {
    email : string,
}
export type Verification = {verified: boolean}

export interface UserAccount{
    user_id: string;
    first_name: string;
    surname: string;
    email: string;
    phone_number: string;
    home_address: string;
    date_of_birth: string;
    occupation: string;
    income: number;
    expenses: number;
    is_verified: boolean;
    
}
export interface UserTokenType extends UserAccount {
    id: string;
}
