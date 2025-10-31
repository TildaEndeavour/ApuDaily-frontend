import type {Timezone} from "../../user/model/Timezone.ts";

export interface SignUpFormInputs {
    username: string;
    email: string;
    timezone: Timezone | undefined;
    password: string;
    confirmPassword: string;
}