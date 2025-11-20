export interface UserModel {
    _id?: string
    name: string
    email: string
    phone?: string
    password: string
    role?: UserRole
    status?: UserStatus
    register_date?: string
}

export interface LoginRequest {
    email: string
    password: string
}

export enum UserRole {
    ALL = 'all',
    CLIENT = 'cliente',
    PROVIDER = 'proveedor',
    ADMIN = 'administrador',
}

export enum UserStatus {
    ALL = 'all',
    PENDING = 'pendiente',
    VERIFIED = 'verificado',
    BLOCKED = 'bloqueado',
}