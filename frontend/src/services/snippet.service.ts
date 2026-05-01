import { ISnippet } from '../types/ISnippet';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const SnippetService = {
    async getAll(params: { q?: string; tag?: string; page?: number; limit?: number }) {
        const query = new URLSearchParams({
            q: params.q || '',
            tag: params.tag || '',
            page: String(params.page || 1),
            limit: String(params.limit || 10),
        });

        const res = await fetch(`${API_URL}/snippets?${query}`, {
            cache: 'no-store',
        });

        if (!res.ok) throw new Error('Failed to fetch snippets');
        return await res.json() as { items: ISnippet[]; total: number; lastPage: number };
    },


    async getById(id: string) {
        const res = await fetch(`${API_URL}/snippets/${id}`);
        if (!res.ok) throw new Error('Snippet not found');
        return await res.json() as ISnippet;
    },

    async create(data: Partial<ISnippet>) {
        const res = await fetch(`${API_URL}/snippets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error('Failed to create snippet');
        return await res.json() as ISnippet;
    },


    async update(id: string, data: Partial<ISnippet>): Promise<ISnippet> {
        const response = await fetch(`${API_URL}/snippets/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to update snippet');
        }

        return response.json();
    },

    async remove(id: string) {
        const res = await fetch(`${API_URL}/snippets/${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            throw new Error('Failed to delete snippet');
        }

        return true;
    },
};