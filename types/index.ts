// iso string value
export type timeString =  string

export interface User {
    name: string,
    id: number
}

export interface Category {
    name: string
    description: string
    id: string
    timeCreate: timeString
}

export interface Purchase {
    id: string
    name: string
    value: number
    currency: '$' | '₽'
    userId: User['id']
    categories: Category[],
    timeCreate: timeString
}