'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Code2, PlusCircle, Tag} from 'lucide-react';
import {SnippetService} from '@/src/services/snippet.service';
import {SnippetTypeEnum} from "@/src/types/enums/snippet-type.enum";
import {ISnippet} from "@/src/types/ISnippet";

interface SnippetFormProps {
    initialData?: ISnippet;
    onSuccess?: () => void;
}

export default function SnippetForm({ initialData, onSuccess }: SnippetFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        content: initialData?.content || '',
        tags: initialData?.tags.join(', ') || '',
        type: initialData?.type || SnippetTypeEnum.NOTE
    });
    const [errors, setErrors] = useState<{title?: string; content?: string}>({});

    const validate = () => {
        const newErrors: any = {};
        if (!formData.title.trim()) newErrors.title = "Name is required";
        if (formData.title.length < 3) newErrors.title = "The name is too short (min. 3 characters)";
        if (!formData.content.trim()) newErrors.content = "Content cannot be empty.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);

        try {
            const data = { ...formData, tags: formData.tags.split(',').map(t => t.trim()) };

            if (initialData) {
                await SnippetService.update(initialData.id, data);
            } else {
                await SnippetService.create(data);
            }

            if (!initialData) setFormData({ title: '', content: '', tags: '', type: SnippetTypeEnum.NOTE });
            router.refresh();
            if (onSuccess) onSuccess();
        } catch (error) {
            alert('Save error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-10">
            <div className="flex items-center gap-2 mb-6 text-blue-400">
                <PlusCircle size={24} />
                <h2 className="text-xl font-semibold text-white">Create New Snippet</h2>
            </div>

            <div className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Snippet Title"
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1 ml-1">{errors.title}</p>}
                </div>

                <div className="relative">
                    <div className="absolute top-3 left-3 text-slate-500">
                        <Code2 size={18} />
                    </div>
                    <textarea
                        placeholder="Paste your code here..."
                        required
                        rows={5}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-slate-100 font-mono text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1 ml-1">{errors.title}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        <div className="absolute top-3 left-3 text-slate-500">
                            <Tag size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Tags (comma separated)"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                            value={formData.tags}
                            onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        />
                    </div>

                    <select
                        className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors capitalize"
                        value={formData.type}
                        onChange={(e) => setFormData({
                            ...formData,
                            type: e.target.value as SnippetTypeEnum
                        })}
                    >
                        {Object.values(SnippetTypeEnum).map((type) => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                    {isLoading ? 'Saving...' : 'Save Snippet'}
                </button>
            </div>
        </form>
    );
}