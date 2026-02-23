import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const Notes = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchNotes = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });
    if (data) setNotes(data);
  };

  useEffect(() => { fetchNotes(); }, [user]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    if (!user || !title.trim()) return;

    if (editingId) {
      const { error } = await supabase
        .from("notes")
        .update({ title, content })
        .eq("id", editingId);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Note updated" });
    } else {
      const { error } = await supabase
        .from("notes")
        .insert({ title, content, user_id: user.id });
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Note created" });
    }
    resetForm();
    fetchNotes();
  };

  const handleEdit = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Note deleted" });
      fetchNotes();
    }
  };

  return (
    <div className="container max-w-3xl py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Notes</h1>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Note
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="mb-8 animate-fade-in">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{editingId ? "Edit Note" : "New Note"}</CardTitle>
              <Button variant="ghost" size="icon" onClick={resetForm}><X className="h-4 w-4" /></Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Note title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Write your note..." value={content} onChange={(e) => setContent(e.target.value)} rows={5} />
            <Button onClick={handleSave} disabled={!title.trim()}>
              <Save className="mr-2 h-4 w-4" /> {editingId ? "Update" : "Save"}
            </Button>
          </CardContent>
        </Card>
      )}

      {notes.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No notes yet. Create your first note!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {notes.map((note) => (
            <Card key={note.id} className="animate-fade-in">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg">{note.title}</h3>
                    {note.content && (
                      <p className="mt-1 text-muted-foreground whitespace-pre-wrap">{note.content}</p>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">
                      {new Date(note.updated_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(note)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(note.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
