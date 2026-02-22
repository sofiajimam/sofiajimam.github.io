"use client";

import { useState } from "react";
import Editor from "./Editor";
import StatusBar from "./StatusBar";
import Tabs from "./Tabs";
import MenuBar from "./MenuBar";

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
      content: `Hi, I'm Sofía Jiménez.
            Full-Stack Developer
            AI Engineer
            System Builder`,
    },
    {
      id: "projects",
      label: "projects.txt",
      content: `Projects:
              - SofIA
              - LXP Platform
              - AI Experiments`,
    },
    {
      id: "contact",
      label: "contact.txt",
      content: `Email:
                GitHub:
                LinkedIn:`,
    },
  ];

  const [notes, setNotes] = useState(initialNotes);
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

    textarea.value = text.substring(0, start) + formatted + text.substring(end);

    textarea.dispatchEvent(new Event("input", { bubbles: true }));
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
        <Editor
          value={currentNote.content}
          onChange={(value) => {
            setNotes((prev) =>
              prev.map((n) => (n.id === active ? { ...n, content: value } : n)),
            );
          }}
          onCursorChange={(l, c, ch) => {
            setLine(l);
            setCol(c);
            setChars(ch);
          }}
        />
      </div>

      <StatusBar line={line} col={col} chars={chars} />
    </div>
  );
}
