// Custom element for note input
class noteInput extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" })

    const container = document.createElement("div")
    container.className = "input-container"

    const form = document.createElement("form")
    form.innerHTML = `
            <input type="text" placeholder="Title" id="note-title" class="input-field" required>
            <textarea placeholder="Your Notes." id="note-body" class="input-field" required></textarea>
            <button type="submit" id="add-button" class="add-button">Add Note</button>
        `

    // Add form to container
    container.appendChild(form)

    // Add styles
    const style = document.createElement("style")
    style.textContent = `
            textarea {
                min-height: fit-content;
                resize: none;
                min-width: 90%;
                overflow-wrap: break-word;
            }

            .input-container {
                border: 2px solid var(--border-color, #3a3a3a);
                background-color: var(--card-color, #1e1e1e);
                border-radius: 10px;
                margin: auto;
                width: 85%;
                max-width: 1000px;
                height: 300px;
                padding: 20px;
                transition: background-color 0.3s ease, border-color 0.3s ease;
                box-shadow: var(--card-shadow, 0 2px 8px rgba(0, 0, 0, 0.3));
            }
            
            .input-field {
                border: none;
                background-color: var(--card-color, #1e1e1e);
                color: var(--text-color, rgb(249, 249, 249));
                width: 100%;
                padding: 10px;
                margin-bottom: 10px;
                transition: background-color 0.3s ease, color 0.3s ease;
            }

            .input-field:focus {
                outline: none;
            }

            #note-title {
                height: 25px;
                font-size: 2em;
            }

            #note-body {
                height: 170px;
            }

            #note-title::placeholder, #note-body::placeholder {
                color: var(--placeholder-color, rgba(227, 227, 227, 0.7));
            }

            .add-button {
                background: radial-gradient(141.42% 141.42% at 100% 0%, #fff6, #fff0), radial-gradient(140.35% 140.35% at 100% 94.74%, #bd34fe, #bd34fe00), radial-gradient(89.94% 89.94% at 18.42% 15.79%, #41d1ff, #41d1ff00);
                box-shadow: 0 1px #ffffffbf inset;
                padding: 10px 20px;
                border-radius: 7px;
                border: none;
                font-family: 'Readex Pro', sans-serif;
                font-weight: 500;
                color: var(--text-color, rgb(249, 249, 249));
                cursor: pointer;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            .add-button:hover {
                transform: scale(1.01);
                background: radial-gradient(141.42% 141.42% at 100% 0%,#ffffff80,#fff0),radial-gradient(140.35% 140.35% at 100% 94.74%,#bd34fe,#bd34fe00),radial-gradient(89.94% 89.94% at 18.42% 15.79%,#41d1ff,#41d1ff00);
                box-shadow: 0 1.5px #fffc inset;
            }

            /* For light theme */
            :host-context(.light-theme) .input-container {
                background-color: var(--card-color, #ffffff);
                border-color: var(--border-color, #cccccc);
            }
            
            :host-context(.light-theme) .input-field {
                background-color: var(--card-color, #ffffff);
                color: var(--text-color, #333333);
            }
            
            :host-context(.light-theme) #note-title::placeholder, 
            :host-context(.light-theme) #note-body::placeholder {
                color: var(--placeholder-color, rgba(100, 100, 100, 0.7));
            }
        `

    shadow.appendChild(style)
    shadow.appendChild(container)

    this.form = form
    this.form.addEventListener("submit", this.handleSubmit.bind(this))
  }

  handleSubmit(event) {
    event.preventDefault()

    const title = this.shadowRoot.querySelector("#note-title").value
    const body = this.shadowRoot.querySelector("#note-body").value

    const formattedBody = body.replace(/\n/g, "<br>")

    const newNote = {
      id: `notes-${Date.now()}`,
      title: title,
      body: formattedBody,
      createdAt: new Date().toISOString(),
      archived: false,
    }

    console.log("Adding new note:", newNote)

    if (typeof window.notesData === "undefined") {
      console.warn("notesData was undefined, initializing...")
      window.notesData = []
    }

    window.notesData.push(newNote)

    this.form.reset()

    if (typeof window.renderNotes === "function") {
      window.renderNotes()
    } else {
      console.error("renderNotes function is not available!")
    }
  }
}

// Register custom element
customElements.define("app-input", noteInput)

