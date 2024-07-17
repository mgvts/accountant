export interface User {
    name: string,
    id: number
}

export interface Category {
    name: string
    description: string
    id: number
}

export interface Purchase {
    name: string
    value: number
    currency: '$' | '₽'
    userId: User['id']
    categoryIds: Category['id'][]
}