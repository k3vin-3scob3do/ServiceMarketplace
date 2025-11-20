export interface ServiceModel {
    _id?: string; 
    category: ServiceCategory | string; 
    name: string;
    provider_id?: string;
    description: string;
    price: number;
    status?: ServiceStatus;
    images?: string[]
    provider_name?: string
    provider_email?: string
}

export enum ServiceStatus {
    ALL = 'all',
    PENDING = 'pendiente',
    APPROVED = 'aprovado',
    REJECTED = 'rechazado'
}

export enum ServiceCategory {
    ALL = 'all',
    TECHNOLOGY = 'tecnologia',
    EDUCATION = 'educacion',
    HEALTH = 'salud',
    HOME = 'hogar',
    BUSINESS = 'negocios',
    TRANSPORT = 'transporte',
    CREATIVE = 'creatividad',
    MARKETING = 'marketing',
    OTHER = 'otro',
}