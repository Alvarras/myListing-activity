// Custom element for note card
class NoteCard extends HTMLElement {
    constructor() {
      super()
  
      // Create shadow DOM
      const shadow = this.attachShadow({ mode: "open" })
  
      // Create template
      const template = document.createElement("template")
      template.innerHTML = `
              <div class="note-card">
                  <div class="note-title"></div>
                  <br>
                  <div class="note-body"></div>
                  <br>
                  <div class="note-date"></div>
              </div>
          `
  
      // Create styles
      const style = document.createElement("style")
      style.textContent = `
              .note-card {
                  font-family: 'Readex Pro', sans-serif;
                  color: var(--text-color, rgb(249, 249, 249));
                  border: 2px solid var(--border-color, #3a3a3a);
                  background-color: var(--card-color, #1e1e1e);
                  border-radius: 10px;
                  width: 100%;
                  height: fit-content;
                  min-height: 105px;
                  padding: 20px;
                  box-sizing: border-box;
                  box-shadow: var(--card-shadow, 0 2px 8px rgba(0, 0, 0, 0.3));
                  transition: transform 0.3s ease, box-shadow 0.3s ease, 
                              background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
              }
  
              .note-card:hover {
                  transform: scale(1.01);
                  box-shadow: var(--card-hover-shadow, 0 4px 12px rgba(0, 0, 0, 0.5));
              }
  
              .note-title {    
                  font-size: 1.5em;
                  font-weight: 500;
              }
              
              .note-body {
                  color: var(--darker-text-color, rgb(227, 227, 227));
              }
              
              .note-date {
                  font-size: 0.7em;
                  color: var(--date-color, rgb(180, 180, 180));
              }
  
              /* For light theme */
              :host-context(.light-theme) .note-card {
                  background-color: var(--card-color, #ffffff);
                  border-color: var(--border-color, #cccccc);
                  color: var(--text-color, #333333);
              }
              
              :host-context(.light-theme) .note-body {
                  color: var(--darker-text-color, #555555);
              }
              
              :host-context(.light-theme) .note-date {
                  color: var(--date-color, rgb(120, 120, 120));
              }
          `
  
      // Add template and styles to shadow DOM
      shadow.appendChild(style)
      shadow.appendChild(template.content.cloneNode(true))
    }
  
    // When element is connected to DOM
    connectedCallback() {
      // Get elements
      const titleElement = this.shadowRoot.querySelector(".note-title")
      const bodyElement = this.shadowRoot.querySelector(".note-body")
      const dateElement = this.shadowRoot.querySelector(".note-date")
  
      // Get attribute values
      const title = this.getAttribute("title") || "No Title"
      const body = this.getAttribute("body") || "No Content"
      const createdAt = this.getAttribute("created-at") || new Date().toISOString()
  
      // Format date
      const date = new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
  
      // Set content
      titleElement.textContent = title
      bodyElement.innerHTML = body 
      dateElement.textContent = `Created on: ${date}`
    }
}

customElements.define("note-card", NoteCard)
  
  