"use client";

import { useState } from "react";
import Editor from "./Editor";
import StatusBar from "./StatusBar";
import Tabs from "./Tabs";
import MenuBar from "./MenuBar";
import {
  ABOUT_CONTENT,
  PROJECTS_CONTENT,
  CONTACT_CONTENT,
  SECRET_CONTENT,
} from "@/constants/notes";

interface Note {
  id: string;
  label: string;
  content: string;
}

export default function NotesApp() {
  const initialNotes: Note[] = [
    {
      id: "about",
      label: "about.txt",
      content: ABOUT_CONTENT,
    },
    {
      id: "projects",
      label: "projects.txt",
      content: PROJECTS_CONTENT,
    },
    {
      id: "contact",
      label: "contact.txt",
      content: CONTACT_CONTENT,
    },
  ];

  const allNotes: Note[] = [
    {
      id: "about",
      label: "about.txt",
      content: ABOUT_CONTENT,
    },
    {
      id: "projects",
      label: "projects.txt",
      content: PROJECTS_CONTENT,
    },
    {
      id: "contact",
      label: "contact.txt",
      content: CONTACT_CONTENT,
    },
    {
      id: "secretnote",
      label: "secretnote.txt",
      content: SECRET_CONTENT,
    },
  ];

  const [notes, setNotes] = useState(allNotes);
  const [openTabs, setOpenTabs] = useState(initialNotes.map((n) => n.id));
  const [active, setActive] = useState(initialNotes[0].id);

  const [line, setLine] = useState(1);
  const [col, setCol] = useState(1);
  const [chars, setChars] = useState(0);

  const currentNote = notes.find((n) => n.id === active)!;

  const openRecent = (id: string) => {
    if (!openTabs.includes(id)) {
      setOpenTabs([...openTabs, id]);
    }
    setActive(id);
  };

  const closeTab = (id: string) => {
    const filtered = openTabs.filter((t) => t !== id);
    setOpenTabs(filtered);
    if (active === id && filtered.length > 0) {
      setActive(filtered[0]);
    }
  };

  const insertDate = () => {
    const now = new Date();
    const formatted =
      now.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }) +
      " " +
      now.toLocaleDateString();

    const textarea = document.querySelector("textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const updated = text.substring(0, start) + formatted + text.substring(end);

    setNotes((prev) =>
      prev.map((n) => (n.id === active ? { ...n, content: updated } : n)),
    );
  };

  return (
    <div className="relative w-[900px] max-w-[95vw] border shadow bg-white flex flex-col h-[600px]">
      <div className="px-4 py-2 border-b bg-gray-200 text-sm">
        Cool Notepad — Portfolio
      </div>

      <MenuBar
        openRecent={openRecent}
        notes={notes.map((n) => ({ id: n.id, label: n.label }))}
        insertDate={insertDate}
      />

      <Tabs
        tabs={notes.filter((n) => openTabs.includes(n.id))}
        active={active}
        setActive={setActive}
        closeTab={closeTab}
      />

      <div className="flex-1 overflow-hidden">
        {openTabs.length === 0 ? (
          <div className="text-center">
            Do something fun rather than closing all tabs. Try in "File" to open
            recent notes
          </div>
        ) : (
          <Editor
            value={currentNote.content}
            onChange={(value) => {
              setNotes((prev) =>
                prev.map((n) =>
                  n.id === active ? { ...n, content: value } : n,
                ),
              );
            }}
            onCursorChange={(l, c, ch) => {
              setLine(l);
              setCol(c);
              setChars(ch);
            }}
          />
        )}
      </div>

      <StatusBar line={line} col={col} chars={chars} />
    </div>
  );
}
