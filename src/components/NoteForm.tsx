"use client";
import { useState, useRef, useEffect } from "react";
import { useNotes } from "@/context/NoteContext";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  const { createNote, selectedNote, setSelectedNote, updateNote } = useNotes();

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content || "");
      titleRef.current?.focus();
    }
  }, [selectedNote]);

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    if (selectedNote) {
      await updateNote(selectedNote.id, { title, content });

      setSelectedNote(null);
    } else {
      await createNote({ title, content });
    }

    setTitle("");
    setContent("");
    titleRef.current?.focus();
  };

  return (
    <form
      onSubmit={async (e) => {
        handleSubmit(e);
      }}
    >
      <input
        type="text"
        name="title"
        autoFocus
        placeholder="Title"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        ref={titleRef}
      />
      <textarea
        name="content"
        placeholder="Content"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>
      <div className="flex justify-end gap-x-2">
        <button
          className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={!title || !content}
        >
          {selectedNote ? "Update Task" : "Create Task"}
        </button>

        {selectedNote && (
          <button
            className="px-5 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
            type="button"
            onClick={() => {
              setSelectedNote(null);
              setTitle("");
              setContent("");
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
