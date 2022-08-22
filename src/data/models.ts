export interface AuthRequest {
    email: string;
    password: string;
}

export interface Auth {
    isAuthenticated: boolean;
    token: string;
    user: User;
}

export interface User {
    fullName: string;
    email: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface SubCategory {
    id: string;
    name: string;
    category: string;
}
