// Define the renderNotes function globally
window.renderNotes = () => {
  console.log("Rendering notes...", window.notesData.length)
  const container = document.getElementById("notes-container")

  if (!container) {
    console.error("Notes container not found!")
    return
  }

  container.innerHTML = ""

  // Check if notesData exists and has items
  if (!window.notesData || window.notesData.length === 0) {
    console.warn("No notes data available!")
    container.innerHTML = '<p style="color: white; text-align: center;">No notes available.</p>'
    return
  }

  // Create note cards for each note
  window.notesData.forEach((note) => {
    if (!note.archived) {
      const noteCard = document.createElement("note-card")
      noteCard.setAttribute("title", note.title)
      noteCard.setAttribute("body", note.body)
      noteCard.setAttribute("created-at", note.createdAt)
      container.appendChild(noteCard)
    }
  })
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, rendering notes...")
  if (typeof window.notesData === "undefined") {
    console.error("notesData is not defined!")
    window.notesData = []
  }

  window.renderNotes()
})

