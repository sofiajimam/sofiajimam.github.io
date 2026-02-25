"use client";

import { useState, useEffect } from "react";
import Editor from "./Editor";
import StatusBar from "./StatusBar";
import Tabs from "./Tabs";
import MenuBar from "./MenuBar";
import {
  ABOUT_CONTENT,
  PROJECTS_CONTENT,
  CONTACT_CONTENT,
  SECRET_CONTENT,
  IDEAS_TEXT,
  HELP_TEXT,
  WHOAMI_TEXT,
  MUSIC_TEXT,
} from "@/constants/notes";

interface Note {
  id: string;
  label: string;
  content: string;
  opened: boolean;
  discovered: boolean;
}

export default function NotesApp() {
  const initialNotes: Note[] = [
    {
      id: "about",
      label: "about.txt",
      content: ABOUT_CONTENT,
      opened: true,
      discovered: true,
    },
    {
      id: "projects",
      label: "projects.txt",
      content: PROJECTS_CONTENT,
      opened: true,
      discovered: true,
    },
    {
      id: "contact",
      label: "contact.txt",
      content: CONTACT_CONTENT,
      opened: true,
      discovered: true,
    },
  ];

  const allNotes: Note[] = [
    {
      id: "about",
      label: "about.txt",
      content: ABOUT_CONTENT,
      opened: true,
      discovered: true,
    },
    {
      id: "projects",
      label: "projects.txt",
      content: PROJECTS_CONTENT,
      opened: true,
      discovered: true,
    },
    {
      id: "contact",
      label: "contact.txt",
      content: CONTACT_CONTENT,
      opened: true,
      discovered: true,
    },
    {
      id: "secretnote",
      label: "secretnote.txt",
      content: SECRET_CONTENT,
      opened: false,
      discovered: true,
    },
    // hidden notes
    {
      id: "ideas",
      label: "ideas.txt",
      content: IDEAS_TEXT,
      opened: false,
      discovered: false,
    },
    {
      id: "help",
      label: "commands.txt",
      content: HELP_TEXT,
      opened: false,
      discovered: false,
    },
    {
      id: "whoissofia",
      label: "whoissofia.txt",
      content: WHOAMI_TEXT,
      opened: false,
      discovered: false,
    },
    {
      id: "music",
      label: "music.txt",
      content: MUSIC_TEXT,
      opened: false,
      discovered: false,
    },
    {
      id: "ai",
      label: "ai.txt",
      content:
        "Not everything has to have AI in it. This is just a decoy note.",
      opened: false,
      discovered: false,
    },
  ];

  const [notes, setNotes] = useState(allNotes);
  const [openTabs, setOpenTabs] = useState(initialNotes.map((n) => n.id));
  const [active, setActive] = useState(initialNotes[0].id);

  const [line, setLine] = useState(1);
  const [col, setCol] = useState(1);
  const [chars, setChars] = useState(0);

  const currentNote = notes.find((n) => n.id === active)!;

  const openedNotesCount = notes.filter((n) => n.discovered).length;
  const totalNotesCount = notes.length;

  const openRecent = (id: string) => {
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActive(id);
  };

  const closeTab = (id: string) => {
    const filtered = openTabs.filter((t) => t !== id);
    setOpenTabs(filtered);
    if (active === id && filtered.length > 0) {
      setActive(filtered[0]);
    }
  };

  const discoverNote = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, discovered: true } : note,
      ),
    );

    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActive(id);
  };

  const handleCommands = (value: string) => {
    const normalized = value.toLowerCase();

    const commands = [
      { keyword: "help", note: "help" },
      { keyword: "whoissofia", note: "whoissofia" },
      { keyword: "music", note: "music" },
      { keyword: "coolai", note: "ai" }
    ];

    commands.forEach(({ keyword, note }) => {
      const target = notes.find((n) => n.id === note);

      if (normalized.includes(keyword) && target && !target.discovered) {
        discoverNote(note);
      }
    });
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

  useEffect(() => {
    const timer = setTimeout(() => {
      const ideas = notes.find((n) => n.id === "ideas");

      if (ideas && !ideas.discovered) {
        discoverNote("ideas");
      }
    }, 20000);

    return () => clearTimeout(timer);
  }, [notes]);

  useEffect(() => {
    if (openedNotesCount === totalNotesCount) {
      alert("System: All notes discovered.");
    }
  }, [openedNotesCount]);

  return (
    <div className="relative w-[900px] max-w-[95vw] border shadow bg-white flex flex-col h-[600px]">
      <div className="relative px-4 py-2 border-b bg-gray-200 text-sm">
        Cool Notepad — Portfolio
        <div className="absolute right-4 top-2 text-xs text-gray-600">
          Discovered: {openedNotesCount}/{totalNotesCount}
        </div>
      </div>
      <MenuBar
        openRecent={openRecent}
        notes={notes
          .filter((n) => n.discovered)
          .map((n) => ({ id: n.id, label: n.label }))}
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
          <div className="h-full flex items-center justify-center text-sm text-gray-500">
            Try in "File" → "Open Recent" to reopen notes
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
              
              // Check the current note is not the command note to avoid infinite loop
              if (!["help"].includes(currentNote.id)) {
                handleCommands(value);
              }
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
