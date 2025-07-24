import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/QuickNotes.tsx
// import QuickNotes from './components/QuickNotes'; // 🔥 Breaks build
import { useState, useEffect } from 'react';
import { Plus, Save, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
export const QuickNotes = () => {
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('anchorstack-notes');
        return saved ? JSON.parse(saved) : [];
    });
    const [quickNote, setQuickNote] = useState('');
    // Save to localStorage whenever notes change
    useEffect(() => {
        localStorage.setItem('anchorstack-notes', JSON.stringify(notes));
    }, [notes]);
    const addNote = (content) => {
        const newNote = {
            id: Date.now().toString(),
            content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setNotes(prev => [newNote, ...prev]);
    };
    const handleQuickSave = () => {
        if (quickNote.trim()) {
            addNote(quickNote.trim());
            setQuickNote('');
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            handleQuickSave();
        }
    };
    const recentNotes = notes.slice(0, 3);
    return (_jsxs(Card, { className: "w-full", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: ["\uD83D\uDCDD Quick Notes", _jsx(Button, { onClick: handleQuickSave, size: "sm", disabled: !quickNote.trim(), className: "h-8 px-3", children: _jsx(Save, { className: "w-4 h-4" }) })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("textarea", { value: quickNote, onChange: (e) => setQuickNote(e.target.value), onKeyDown: handleKeyPress, placeholder: "Capture a quick thought... (Cmd/Ctrl + Enter to save)", className: "w-full h-24 p-3 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm", maxLength: 500 }), _jsxs("div", { className: "text-xs text-gray-500 mt-1 flex justify-between", children: [_jsx("span", { children: "Cmd/Ctrl + Enter to save" }), _jsxs("span", { children: [quickNote.length, "/500"] })] })] }), recentNotes.length > 0 && (_jsxs("div", { children: [_jsxs("h4", { className: "text-sm font-medium text-gray-700 mb-2 flex items-center", children: [_jsx(Edit3, { className: "w-4 h-4 mr-1" }), "Recent Notes"] }), _jsx("div", { className: "space-y-2", children: recentNotes.map((note) => (_jsxs("div", { className: "p-3 bg-gray-50 rounded-lg border text-sm text-gray-700", children: [_jsx("p", { className: "line-clamp-2 mb-1", children: note.content || 'Empty note' }), _jsx("div", { className: "text-xs text-gray-500", children: new Date(note.createdAt).toLocaleDateString() })] }, note.id))) }), notes.length > 3 && (_jsxs("div", { className: "text-xs text-gray-500 mt-2 text-center", children: ["+", notes.length - 3, " more notes in the Notes page"] }))] })), notes.length === 0 && (_jsxs("div", { className: "text-center py-8 text-gray-500", children: [_jsx(Plus, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }), _jsx("p", { className: "text-sm font-medium mb-1", children: "No notes yet" }), _jsx("p", { className: "text-xs", children: "Start capturing your thoughts above!" })] })), notes.length > 0 && (_jsx("div", { className: "text-center pt-2 border-t border-gray-100", children: _jsxs("p", { className: "text-xs text-gray-500", children: [notes.length, " note", notes.length !== 1 ? 's' : '', " saved"] }) }))] })] }));
};
export default QuickNotes;
