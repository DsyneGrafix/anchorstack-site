// src/components/QuickNotes.tsx
import React, { useState, useEffect } from 'react'
import { Plus, Save, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

interface Note {
  id: string
  content: string
  createdAt: string
  updatedAt: string
}

export const QuickNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('anchorstack-notes')
    return saved ? JSON.parse(saved) : []
  })
  const [quickNote, setQuickNote] = useState('')

  // Save to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('anchorstack-notes', JSON.stringify(notes))
  }, [notes])

  const addNote = (content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setNotes(prev => [newNote, ...prev])
  }

  const handleQuickSave = () => {
    if (quickNote.trim()) {
      addNote(quickNote.trim())
      setQuickNote('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleQuickSave()
    }
  }

  const recentNotes = notes.slice(0, 3)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          📝 Quick Notes
          <Button 
            onClick={handleQuickSave} 
            size="sm" 
            disabled={!quickNote.trim()}
            className="h-8 px-3"
          >
            <Save className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Input */}
        <div>
          <textarea
            value={quickNote}
            onChange={(e) => setQuickNote(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Capture a quick thought... (Cmd/Ctrl + Enter to save)"
            className="w-full h-24 p-3 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            maxLength={500}
          />
          <div className="text-xs text-gray-500 mt-1 flex justify-between">
            <span>Cmd/Ctrl + Enter to save</span>
            <span>{quickNote.length}/500</span>
          </div>
        </div>

        {/* Recent Notes Preview */}
        {recentNotes.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Edit3 className="w-4 h-4 mr-1" />
              Recent Notes
            </h4>
            <div className="space-y-2">
              {recentNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-3 bg-gray-50 rounded-lg border text-sm text-gray-700"
                >
                  <p className="line-clamp-2 mb-1">
                    {note.content || 'Empty note'}
                  </p>
                  <div className="text-xs text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
            {notes.length > 3 && (
              <div className="text-xs text-gray-500 mt-2 text-center">
                +{notes.length - 3} more notes in the Notes page
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {notes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Plus className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium mb-1">No notes yet</p>
            <p className="text-xs">Start capturing your thoughts above!</p>
          </div>
        )}

        {/* Stats */}
        {notes.length > 0 && (
          <div className="text-center pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              {notes.length} note{notes.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default QuickNotes
