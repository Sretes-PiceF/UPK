export interface UserType {
    user_nama: string;
    user_username: string;
    user_notelp: string;
    user_level: string;
    created_at: Date;
    updated_at: Date;
}


export interface CheckUser {
    user: UserType | null;
    nama: string;
}