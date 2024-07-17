import Dexie from 'dexie';

export class IDBService {
    private db: Dexie;

    constructor() {
        this.db = new Dexie('Accountant');
        this.db.version(1).stores({
            category: '++id,name,description',
            purchase: '++id,name,value,User,category',
            user: '++id,name'
        });
    }

    private async get(store: string, id: number) {
        return await this.db.table(store).get(id);
    }

    private async getAll(store: string) {
        return await this.db.table(store).toArray();
    }

    private async remove(store: string, id: number) {
        return await this.db.table(store).delete(id);
    }

    private async put(store: string, item: any) {
        return await this.db.table(store).put(item);
    }

    public async putCategory(name: string, description: string = '') {
        return await this.put('category', {name, description});
    }

    public async putPurchase(name: string, value: {
        value: number;
        currency: string;
    }, User: string, category: string[]) {
        return await this.put('purchase', {name, value, User, category});
    }

    public async putUser(name: string) {
        return await this.put('user', {name});
    }

    public async getCategory(id: number) {
        return await this.get('category', id);
    }

    public async getAllCategories() {
        return await this.getAll('category');
    }

    public async removeCategory(id: number) {
        return await this.remove('category', id);
    }

    public async getPurchase(id: number) {
        return await this.get('purchase', id);
    }

    public async getAllPurchases() {
        return await this.getAll('purchase');
    }

    public async removePurchase(id: number) {
        return await this.remove('purchase', id);
    }

    public async getUser(id: number) {
        return await this.get('user', id);
    }

    public async getAllUsers() {
        return await this.getAll('user');
    }

    public async removeUser(id: number) {
        return await this.remove('user', id);
    }
}

export const useIndexedDB = () => {
    return new IDBService();
};
