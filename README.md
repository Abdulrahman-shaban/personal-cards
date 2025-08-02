
👨‍💻 Author
Abdulrahman Mohamed Shaban

💼 LinkedIn : https://www.linkedin.com/in/abdulrahman-m-helmy/

🧠 Frontend Developer | React | Vue


# 💳 Personal Credit Card Manager

This is a simple React + Vite + TailwindCSS application that allows users to securely manage their credit cards. You can add, edit, and delete cards with basic validation and light/dark mode support.

## 🌐 Live Demo

🔗 [View on GitHub Pages](https://abdulrahman-shaban.github.io/personal-cards/)

---
<img width="1919" height="961" alt="Screenshot 2025-08-03 014320" src="https://github.com/user-attachments/assets/8e4c4de2-834d-46c0-bd6e-7b343231cdac" />


## 🚀 Features

- Add credit card with validations (card number, expiry, CVV)
- Edit existing cards
- Delete cards with CVV confirmation
- Card status (Active / Expired)
- Dark mode toggle 🌙 / ☀️
- Data stored locally in `localStorage`

---

## 🛠️ Technologies Used

- **React**
- **Vite**
- **Tailwind CSS**
- **React Router DOM**
- **localStorage**

---

## 📦 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/Abdulrahman-shaban/personal-cards.git
cd personal-cards

# Install dependencies
npm install

# Start development server
npm run dev
```
📤 Deployment to GitHub Pages
# Build the project
npm run build

# Deploy to gh-pages branch
npm run deploy


Make sure your vite.config.js includes: 

export default defineConfig({
  plugins: [react()],
  base: '/personal-cards/', // Replace with your repo name
})

And your package.json has:

"homepage": "https://abdulrahman-shaban.github.io/personal-cards",
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}



📁 Folder Structure

src/
  components/
    DeleteConfirmModal.jsx
  pages/
    Home.jsx
    AddCard.jsx
    EditCard.jsx
  utils/
    storage.js
  App.jsx
  main.jsx
index.html
vite.config.js

📄 License
This project is open source and free to use under the MIT License.
