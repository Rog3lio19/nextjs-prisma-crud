import { Note } from "@prisma/client";
import { useNotes } from "@/context/NoteContext";
import { BiEdit, BiTrash } from "react-icons/bi";

const NoteCard = ({ note }: { note: Note }) => {
  const { deleteNote, setSelectedNote } = useNotes();

  return (
    <div
      className="bg-slate-400 p-4 my-2 flex justify-between rounded-lg"
      key={note.id}
    >
      <div>
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <p>{note.content}</p>
        <p className="italic">
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex gap-x-2">
        <button
          onClick={() => {
            setSelectedNote(note);
          }}
        >
          <BiEdit className="text-2xl text-blue-700" />
        </button>
        <button
          onClick={async () => {
            {
              if (confirm("Are you sure you want delete this note?")) {
                await deleteNote(Number(note.id));
              }
            }
          }}
        >
          <BiTrash className="text-2xl text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
