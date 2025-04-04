# 🎬 Vimeo Video Player with Resume Feature

A simple web-based Vimeo video player that automatically resumes playback from where you left off using **IndexedDB** and **localStorage**. Built using plain **HTML**, **CSS**, and **JavaScript**—no frameworks required!

---

## 📁 Files Included

| File        | Description                              |
|-------------|------------------------------------------|
| `index.html`| Main HTML structure and layout           |
| `style.css` | Styling for layout, buttons, and iframe  |
| `script.js` | JavaScript logic (IndexedDB + Vimeo API) |

---

## 💡 Features

- 🎥 Enter any public **Vimeo video URL**
- ⏳ Saves playback progress using **IndexedDB**
- 🔁 Automatically resumes from last watched time
- 📌 Remembers the **last played video** with `localStorage`
- ✅ URL validation to ensure correct Vimeo links

---

## 🚀 How to Use

1. Clone or download the project files.
2. Open `index.html` in any modern browser.
3. Enter a **Vimeo video URL** (e.g., `https://vimeo.com/123456789`).
4. Click the **Play** button to start the video.
5. The app will:
   - Save your playback time locally.
   - Resume from where you left off on next visit or reload.

---

## 📦 Requirements

- No build tools or installations required.
- Make sure to include the **Vimeo Player API**:
  
```html
<script src="https://player.vimeo.com/api/player.js"></script>
