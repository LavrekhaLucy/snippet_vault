
import { Calendar, Tag, ChevronLeft, Edit3 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {SnippetService} from "@/src/services/snippet.service";

export default async function SnippetDetailsPage({ params }: { params: { id: string } }) {
    let snippet;

    try {
        snippet = await SnippetService.getById(params.id);
    } catch (error) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
            <div className="max-w-4xl mx-auto">

                <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
                    <ChevronLeft size={20} />
                    <span>Back to list</span>
                </Link>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-4xl font-bold text-white">{snippet.title}</h1>
                        <Link
                            href={`/snippets/${snippet.id}/edit`}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <Edit3 size={18} />
                            Edit
                        </Link>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-8 text-sm text-slate-400">
                        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full">
                            <Calendar size={16} />
                            {new Date(snippet.createdAt).toLocaleDateString()}
                        </div>
                        {snippet.tags.map((tag: string) => (
                            <div key={tag} className="flex items-center gap-1 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                                <Tag size={14} />
                                {tag}
                            </div>
                        ))}
                    </div>

                    <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 font-mono text-sm leading-relaxed overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>{snippet.content}</code>
            </pre>
                    </div>
                </div>
            </div>
        </main>
    );
}