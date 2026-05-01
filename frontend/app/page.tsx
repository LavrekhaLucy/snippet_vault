'use client';

import React, { useState, useEffect } from 'react';
import SnippetForm from "@/src/components/SnippetForm";
import SnippetCard from "@/src/components/SnippetCard";
import { SnippetService } from '@/src/services/snippet.service';
import { ISnippet } from '@/src/types/ISnippet';
import Pagination from "@/src/components/Pagination";

export default function HomePage() {
    const [items, setItems] = useState<ISnippet[]>([]);
    const [filteredItems, setFilteredItems] = useState<ISnippet[]>([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [editingSnippet, setEditingSnippet] = useState<ISnippet | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const loadSnippets = async () => {
        try {
            setIsLoading(true);
            const data = await SnippetService.getAll({ limit: 100 });
            setItems(data.items || []);
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadSnippets().catch((error) => {
            console.error("Failed to load snippets on mount:", error);
        });
    }, []);

    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        setFilteredItems(
            items.filter(item =>
                item.title.toLowerCase().includes(lowerSearch) ||
                item.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
            )
        );
    }, [search, items]);

    const handleEdit = (snippet: ISnippet) => {
        setEditingSnippet(snippet);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">My Snippets</h1>
                    {editingSnippet && (
                        <button
                            onClick={() => setEditingSnippet(null)}
                            className="text-blue-400 hover:underline text-sm"
                        >
                            + Create new instead of editing
                        </button>
                    )}
                </div>

                {/* Пошук */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search by name or tag..."
                        className="w-full p-3 bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Форма (Редагування або Створення) */}
                <section className="mb-12">
                    <SnippetForm
                        key={editingSnippet?.id || 'new'}
                        initialData={editingSnippet || undefined}
                        onSuccess={() => {
                            setEditingSnippet(null);
                            loadSnippets().catch((error) => {
                                console.error("Failed to load snippets on mount:", error);
                            });
                        }}
                    />
                </section>

                {/* Стани завантаження / Порожній список */}
                {isLoading ? (
                    <div className="text-center py-20 animate-pulse text-slate-500">Loading snippets...</div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                        {search ? 'Nothing found for your query' : 'The list is empty. Create your first snippet!'}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {currentItems.map(snippet => (
                            <SnippetCard
                                key={snippet.id}
                                snippet={snippet}
                                onEdit={handleEdit}
                                onDelete={async (id) => {
                                    if (confirm('Delete this snippet?')) {
                                        try {
                                            await SnippetService.remove(id);
                                            await loadSnippets();
                                        } catch (error) {
                                            console.error("Failed to delete", error);
                                            alert("Failed to delete snippet. Please try again.");
                                        }
                                    }
                                }}
                            />
                        ))}
                    </div>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />

            </div>
        </main>
    );
}