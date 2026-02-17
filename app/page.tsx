import NoteWindow from "@/components/NoteWindow"
import AboutNote from "@/components/notes/AboutNote"
import ProjectsNote from "@/components/notes/ProjectsNote"
import ContactNote from "@/components/notes/ContactNote"

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      
      <NoteWindow title="about.txt" defaultPosition={{ x: 60, y: 60 }}>
        <AboutNote />
      </NoteWindow>

      <NoteWindow title="projects.txt" defaultPosition={{ x: 420, y: 120 }}>
        <ProjectsNote />
      </NoteWindow>

      <NoteWindow title="contact.txt" defaultPosition={{ x: 200, y: 380 }}>
        <ContactNote />
      </NoteWindow>

    </main>
  )
}
