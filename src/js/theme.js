// Theme initialization and management
document.addEventListener("DOMContentLoaded", () => {
  console.log("Theme initialization...")

  const savedTheme = localStorage.getItem("theme")
  console.log("Saved theme:", savedTheme)

  // Apply theme based on saved preference
  if (savedTheme === "light") {
    document.documentElement.classList.add("light-theme")
    console.log("Applied light theme from saved preference")
  } else {
    document.documentElement.classList.remove("light-theme")
    localStorage.setItem("theme", "dark")
    console.log("Applied dark theme from saved preference or default")
  }

  updateCSSVariables()
})

// Update CSS variables based on current theme
function updateCSSVariables() {
  const isLightTheme = document.documentElement.classList.contains("light-theme")
  console.log("Updating CSS variables, light theme:", isLightTheme)

  if (isLightTheme) {
    document.documentElement.style.setProperty("--primary-color", "#f5f5f5")
    document.documentElement.style.setProperty("--card-color", "#ffffff")
    document.documentElement.style.setProperty("--border-color", "#cccccc")
    document.documentElement.style.setProperty("--text-color", "#333333")
    document.documentElement.style.setProperty("--darker-text-color", "#555555")
    document.documentElement.style.setProperty("--background-dot-color", "#dddddd")
    document.documentElement.style.setProperty("--placeholder-color", "rgba(100, 100, 100, 0.7)")
    document.documentElement.style.setProperty("--date-color", "rgb(120, 120, 120)")
    document.documentElement.style.setProperty("--card-shadow", "0 2px 8px rgba(0, 0, 0, 0.1)")
    document.documentElement.style.setProperty("--card-hover-shadow", "0 4px 12px rgba(0, 0, 0, 0.15)")
  } else {
    document.documentElement.style.setProperty("--primary-color", "#101010")
    document.documentElement.style.setProperty("--card-color", "#1e1e1e")
    document.documentElement.style.setProperty("--border-color", "#3a3a3a")
    document.documentElement.style.setProperty("--text-color", "rgb(249, 249, 249)")
    document.documentElement.style.setProperty("--darker-text-color", "rgb(227, 227, 227)")
    document.documentElement.style.setProperty("--background-dot-color", "#2c2c2c")
    document.documentElement.style.setProperty("--placeholder-color", "rgba(227, 227, 227, 0.7)")
    document.documentElement.style.setProperty("--date-color", "rgb(180, 180, 180)")
    document.documentElement.style.setProperty("--card-shadow", "0 2px 8px rgba(0, 0, 0, 0.3)")
    document.documentElement.style.setProperty("--card-hover-shadow", "0 4px 12px rgba(0, 0, 0, 0.5)")
  }
}

// Expose theme toggle function globally
window.toggleTheme = () => {
  const isLightTheme = document.documentElement.classList.toggle("light-theme")
  const newTheme = isLightTheme ? "light" : "dark"

  console.log("Theme toggled to:", newTheme)

  // Save preference
  localStorage.setItem("theme", newTheme)

  // Update CSS variables
  updateCSSVariables()

  return newTheme
}

