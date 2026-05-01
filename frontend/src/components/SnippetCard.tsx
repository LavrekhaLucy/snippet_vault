'use client';
import {Calendar, Tag, Code2, Trash2, Pencil} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {SnippetService} from "@/src/services/snippet.service";
import {ISnippet} from "@/src/types/ISnippet";


interface SnippetCardProps {
    snippet: ISnippet;
    onEdit: (snippet: ISnippet) => void;
    onDelete: (id: string) => void;
}

export default function SnippetCard({ snippet, onEdit, onDelete }: SnippetCardProps) {
    const router = useRouter();

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (confirm('Are you sure you want to delete this snippet?')) {
            try {
                await SnippetService.remove(snippet.id);
                router.refresh();
            } catch (error) {
                alert('Failed to delete');
            }
        }
    };
    return (
        <div className="group bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 transition-all shadow-lg">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                        <Code2 size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
                        {snippet.title}
                    </h3>
                </div>
            </div>


            <div className="bg-slate-950/50 rounded-lg p-3 mb-4 border border-slate-800/50">

                <p className="text-slate-400 text-sm font-mono line-clamp-3">
                    {snippet.content || "No content available"}
                </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {snippet.tags.map((tag:string) => (
                    <span key={tag}
                        className="flex items-center gap-1 px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-md border border-slate-700"
                    >
            <Tag size={12} />
                        {tag}
          </span>
                ))}
            </div>

            <div className="flex items-center text-slate-500 text-xs gap-4 border-t border-slate-800 pt-4">
                <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(snippet.createdAt).toLocaleDateString()}
                </div>
                <div className="ml-auto">
          <span className="text-blue-500/80 font-medium uppercase tracking-wider text-[10px]">
            {snippet.type}
          </span>
                        <button
                            onClick={() => onEdit(snippet)}
                            className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                            title="Edit"
                        >
                            <Pencil size={18} />
                        </button>
                        <button
                            onClick={() => onDelete(snippet.id)}
                            className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                            title="Delete"
                        >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
            <pre className="text-xs text-slate-400 bg-slate-950 p-3 rounded-lg overflow-x-auto mb-4 font-mono">
        {snippet.content}
      </pre>

            <div className="flex flex-wrap gap-2">
                {snippet.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 bg-slate-800 text-slate-300 rounded-md border border-slate-700">
            #{tag}
          </span>
                ))}
            </div>

        </div>
    );
}