import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Trash2Icon, Edit3Icon, SaveIcon, XIcon } from "lucide-react";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // 1. Fetch the specific note on load
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Note not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  // 2. DELETE Logic
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/"); // Send user back to home after deletion
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  // 3. UPDATE Logic
  const handleUpdate = async () => {
    setSaving(true);
    try {
      const res = await api.put(`/notes/${id}`, note);
      setNote(res.data); // Update local state with saved data
      setIsEditing(false); // Switch back to view mode
      toast.success("Note updated!");
    } catch (error) {
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate("/")} className="btn btn-ghost btn-sm">
          ← Back
        </button>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button className="btn btn-success btn-sm" onClick={handleUpdate} disabled={saving}>
                <SaveIcon className="size-4 mr-2" /> {saving ? "Saving..." : "Save"}
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => setIsEditing(false)}>
                <XIcon className="size-4" />
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                <Edit3Icon className="size-4 mr-2" /> Edit
              </button>
              <button className="btn btn-error btn-sm btn-outline" onClick={handleDelete}>
                <Trash2Icon className="size-4 mr-2" /> Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-base-100 p-8 rounded-xl shadow-lg border-t-4 border-solid border-[#00FF9D]">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              className="input input-bordered w-full text-2xl font-bold bg-base-200"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
            <textarea
              className="textarea textarea-bordered w-full h-96 text-lg bg-base-200"
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4 text-base-content">{note.title}</h1>
            <p className="text-lg text-base-content/80 whitespace-pre-wrap leading-relaxed">
              {note.content}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteDetailPage;