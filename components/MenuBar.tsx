"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  openRecent: (noteId: string) => void;
  notes: { id: string; label: string }[];
  insertDate: () => void;
}

export default function MenuBar({ openRecent, notes, insertDate }: Props) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative z-50 flex gap-2 px-3 py-1 text-sm border-b bg-gray-100"
    >
      {/* FILE */}
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu("file");
          }}
          className="px-2 py-1 hover:bg-blue-200 cursor-pointer"
        >
          File
        </button>

        {openMenu === "file" && (
          <div className="absolute left-0 top-full mt-1 bg-white border shadow-md z-[999] min-w-[180px]">
            <div className="px-3 py-2 text-xs text-gray-500">Open Recent</div>

            {notes.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  openRecent(n.id);
                  setOpenMenu(null);
                }}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {n.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EDIT */}
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu("edit");
          }}
          className="px-2 py-1 hover:bg-blue-200 cursor-pointer"
        >
          Edit
        </button>

        {openMenu === "edit" && (
          <div className="absolute left-0 top-full mt-1 bg-white border shadow-md z-[999] min-w-[180px]">
            <div
              onClick={() => {
                insertDate();
                setOpenMenu(null);
              }}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
            >
              Time/Date
            </div>
          </div>
        )}
      </div>

      <button className="px-2 py-1 hover:bg-blue-200 cursor-default">
        View
      </button>
    </div>
  );
}
