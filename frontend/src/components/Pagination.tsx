'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-6 mt-12 pb-10">
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 bg-slate-900 border border-slate-800 rounded-lg disabled:opacity-30 hover:bg-slate-800 transition-colors text-slate-300"
            >
                <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2 font-mono text-sm">
                <span className="text-slate-500">Page</span>
                <span className="text-blue-400 font-bold">{currentPage}</span>
                <span className="text-slate-500">of</span>
                <span className="text-slate-300">{totalPages}</span>
            </div>

            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 bg-slate-900 border border-slate-800 rounded-lg disabled:opacity-30 hover:bg-slate-800 transition-colors text-slate-300"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
}