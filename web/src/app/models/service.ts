export interface ServiceModel {
    _id?: string; 
    category: ServiceCategory; 
    name: string;
    provider_id?: string;
    description: string;
    price: number;
    status: ServiceStatus;
    images: string[]
}

export enum ServiceStatus {
    PENDING = 'pendiente',
    APPROVED = 'aprovado',
    REJECTED = 'rechazado'
}

export enum ServiceCategory {
    TECHNOLOGY = 'tecnologia',
    EDUCATION = 'educacion',
    HEALTH = 'salud',
    HOME = 'hogar',
    BUSINESS = 'negocios',
    TRANSPORT = 'transporte',
    CREATIVE = 'creatividad',
    MARKETING = 'marketing',
    OTHER = 'otro',
    ALL = 'todas',
}