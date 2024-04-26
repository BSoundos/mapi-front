export interface LoginCredentails {
    email: string;
    password: string;
}

export type LoginDispatchFunction = (
    arg: {
        payload: unknown;
        type: "auth/loginSuccess" | "auth/loginFailure";
    }
) => void;

export type RegisterDispatchFunction = (
    arg: {
        payload: unknown;
        type: "auth/registerSuccess" | "auth/registerFailure";
    }
) => void;

export type VerifyDispatchFunction = (
    arg: {
        payload: unknown;
        type: "auth/verifySuccess" | "auth/verifyFailure";
    }
) => void;

export type LogoutDispatchFunction = (
    arg: {
        payload: unknown;
        type: "auth/logoutSuccess" | "auth/logoutFailure";
    }
) => void;