export interface User {
    user_id: string;
    user_nama: string;
    user_email: string;
    user_username: string;
    user_notelp: string;
    user_level: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    user: User;
}