//custom element
// header custom element
class appHeader extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" })
    const container = document.createElement("div")
    container.className = "header-container"

    const profileIcon = document.createElement("div")
    profileIcon.className = "profile-icon"

    const iconImage = this.getAttribute("icon-image")
    if (iconImage) {
      profileIcon.style.backgroundImage = `url('${iconImage}')`
      profileIcon.style.backgroundSize = "cover"
    }

    const title = document.createElement("span")
    title.className = "header-title"
    title.textContent = "Notes App"

    const themeToggle = document.createElement("button")
    themeToggle.className = "theme-toggle"
    themeToggle.id = "theme-toggle-btn"

    const currentTheme = localStorage.getItem("theme") || "dark"
    console.log("Header initializing with theme:", currentTheme)

    if (currentTheme === "light") {
      themeToggle.innerHTML = "☀️" // Light mode icon
      themeToggle.setAttribute("data-theme", "light")
    } else {
      themeToggle.innerHTML = "🌙" // Dark mode icon
      themeToggle.setAttribute("data-theme", "dark")
    }

    themeToggle.setAttribute("aria-label", "Toggle light/dark theme")
    themeToggle.title = "Toggle light/dark theme"

    // Add event listener to toggle theme
    themeToggle.addEventListener("click", () => {
      console.log("Theme toggle button clicked")

      // Get current theme before toggle
      const currentTheme = document.documentElement.classList.contains("light-theme") ? "light" : "dark"
      console.log("Current theme before toggle:", currentTheme)

      // Toggle theme using the global function
      const newTheme = window.toggleTheme()
      console.log("New theme after toggle:", newTheme)

      // Update button icon based on new theme
      if (newTheme === "light") {
        themeToggle.innerHTML = "☀️" 
        themeToggle.setAttribute("data-theme", "light")
      } else {
        themeToggle.innerHTML = "🌙" 
        themeToggle.setAttribute("data-theme", "dark")
      }
    })

    container.appendChild(profileIcon)
    container.appendChild(title)
    container.appendChild(themeToggle) 

    //styling to shadow DOM
    const style = document.createElement("style")
    style.textContent = `
            .header-container {
                display: flex;
                align-items: center;
                padding: 15px 20px;
                background-color: var(--primary-color, #101010);
                border-bottom: 1px solid var(--border-color, #3a3a3a);
                width: 100%;
                box-sizing: border-box;
                margin-bottom: 25px;
                transition: background-color 0.3s ease, border-color 0.3s ease;
            }
            
            .profile-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 15px;
                background-color: rgb(88, 88, 88); /* Warna default jika tidak ada gambar */
                background-size: cover;
                border: 2px solid var(--border-color, #3a3a3a);
            }
            
            .header-title {
                font-size: 20px;
                font-family: 'Readex Pro', sans-serif;
                font-weight: 500;
                color: var(--text-color, rgb(249, 249, 249));
                flex-grow: 1;
                transition: color 0.3s ease;
            }
            
            .theme-toggle {
                background: none;
                border: 1px solid var(--border-color, #3a3a3a);
                font-size: 24px;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                transition: background-color 0.3s ease, border-color 0.3s ease;
            }
            
            .theme-toggle:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }

            /* For light theme */
            :host-context(.light-theme) .header-container {
                background-color: var(--primary-color, #f5f5f5);
                border-bottom: 1px solid var(--border-color, #cccccc);
            }
            
            :host-context(.light-theme) .header-title {
                color: var(--text-color, #333333);
            }
            
            :host-context(.light-theme) .theme-toggle:hover {
                background-color: rgba(0, 0, 0, 0.05);
            }
        `

    shadow.appendChild(style)
    shadow.appendChild(container)
  }

  static get observedAttributes() {
    return ["icon-image"]
  }

  // control changing
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "icon-image" && oldValue !== newValue) {
      const profileIcon = this.shadowRoot.querySelector(".profile-icon")
      if (newValue) {
        profileIcon.style.backgroundImage = `url('${newValue}')`
        profileIcon.style.backgroundSize = "cover"
      } else {
        profileIcon.style.backgroundImage = "" 
        profileIcon.style.backgroundColor = "#007bff" 
      }
    }
  }
}

customElements.define("app-header", appHeader)

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    document.documentElement.classList.add("light-theme")
  }
})

