import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import DataCard from "./components/DataCard";

// Configurable API base URL (can be swapped with import.meta.env.VITE_API_URL in production)
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/notes";

const App = () => {
  // State management
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      subject: "",
    },
  });

  /**
   * Fetch all notes from the backend
   */
  const fetchNotes = useCallback(async () => {
    try {
      setIsLoading(true);
      setApiError(null);
      const res = await axios.get(`${API_BASE_URL}/getAllNotes`);
      setNotes(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      setApiError(err.response?.data?.message || "Failed to load notes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Handle form submission (Create or Update note)
   */
  const onSubmit = async (formData) => {
    try {
      setApiError(null);
      if (editingNoteId) {
        // Update existing note (PATCH)
        await axios.patch(`${API_BASE_URL}/${editingNoteId}`, formData);
        setEditingNoteId(null);
      } else {
        // Create new note (POST)
        await axios.post(`${API_BASE_URL}/create`, formData);
      }

      reset({ title: "", subject: "" });
      await fetchNotes();
    } catch (err) {
      console.error("Failed to save note:", err);
      setApiError(err.response?.data?.message || "Failed to save note.");
    }
  };

  /**
   * Populate form inputs for editing an existing note
   */
  const handleEdit = (note) => {
    setEditingNoteId(note._id);
    setValue("title", note.title);
    setValue("subject", note.subject);
  };

  /**
   * Cancel edit mode and reset form fields
   */
  const handleCancelEdit = () => {
    setEditingNoteId(null);
    reset({ title: "", subject: "" });
  };

  /**
   * Delete note by ID
   */
  const handleDelete = async (id) => {
    try {
      setApiError(null);
      await axios.delete(`${API_BASE_URL}/${id}`);
      await fetchNotes();
    } catch (err) {
      console.error("Failed to delete note:", err);
      setApiError(err.response?.data?.message || "Failed to delete note.");
    }
  };

  // Initial load
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className="min-h-screen w-full p-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Notes App</h1>
        <p className="text-gray-500 text-sm mt-1">Organize and manage your thoughts easily</p>
      </header>

      {/* Global API Error Alert */}
      {apiError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm flex justify-between items-center">
          <span>{apiError}</span>
          <button
            onClick={() => setApiError(null)}
            className="text-red-500 font-bold hover:text-red-800"
          >
            ✕
          </button>
        </div>
      )}

      {/* Note Creation / Editing Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-100 p-6 rounded-3xl w-full max-w-lg flex flex-col gap-4 shadow-sm border border-gray-200"
      >
        <h2 className="text-lg font-semibold text-gray-800">
          {editingNoteId ? "Edit Note" : "Create New Note"}
        </h2>

        {/* Title Field */}
        <div className="flex flex-col gap-1">
          <input
            {...register("title", { required: "Title is required" })}
            className="h-11 w-full bg-white outline-none rounded-2xl px-4 border border-gray-300 focus:ring-2 focus:ring-black transition"
            placeholder="Title"
            type="text"
          />
          {errors.title && (
            <span className="text-xs text-red-500 px-2">{errors.title.message}</span>
          )}
        </div>

        {/* Subject Field */}
        <div className="flex flex-col gap-1">
          <textarea
            {...register("subject", { required: "Subject is required" })}
            className="w-full bg-white outline-none rounded-2xl p-4 border border-gray-300 focus:ring-2 focus:ring-black transition resize-none h-24"
            placeholder="Subject / Description"
          />
          {errors.subject && (
            <span className="text-xs text-red-500 px-2">{errors.subject.message}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white h-10 px-6 rounded-full font-medium hover:bg-gray-800 disabled:opacity-50 transition cursor-pointer"
          >
            {isSubmitting ? "Saving..." : editingNoteId ? "Update Note" : "Create Note"}
          </button>

          {editingNoteId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-300 text-gray-700 h-10 px-5 rounded-full font-medium hover:bg-gray-400 transition cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Notes Grid Display */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-800">All Notes ({notes.length})</h2>

        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-gray-400 text-sm italic">No notes found. Create your first note above!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {notes.map((note) => (
              <DataCard
                key={note._id}
                notes={note}
                deleteData={handleDelete}
                updateData={handleEdit}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default App;