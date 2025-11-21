export enum ContractStatus {
    REQUESTED = 'solicitado',
    REJECTED = 'rechazado',
    IN_PROGRESS = 'en_progreso',
    COMPLETED = 'completado',
    CANCELED = 'cancelado'
}
export interface ContractModel {
    _id?: string
    client_id?: string
    service_id?: string
    provider_id?: string 
    description: string
    status: ContractStatus | string
    provider_name?: string
    service_name?: string
    client_name?: string
    request_date?: string
}