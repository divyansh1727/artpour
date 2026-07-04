# 🎨 PourByKay AI Assistant — Long-Term Memory Shopping Assistant

An AI-powered shopping assistant built for **Handmade Art & Craft by PourByKay** using **Google Gemini 2.5 Flash** and **Cognee Cloud Semantic Memory**.

Unlike traditional AI chatbots that forget users after every session, this assistant stores customer preferences in a semantic knowledge graph and retrieves them in future conversations to provide personalized shopping recommendations.

---

## 🎥 Demo

**Live Demo:** *Coming Soon*

![Demo](assets/demo.mp4)



---

## 📸 Screenshots


### 🏠 Home Page

![Home](assets/home.png)

### 💬 AI Shopping Assistant

![Chat](assets/chat.png)

### 🧠 Personalized Recommendations

![Memory](assets/memory.png)

---

# ✨ Features

* 🧠 Long-Term Semantic Memory using Cognee Cloud
* 🤖 AI-powered conversations using Gemini 2.5 Flash
* 💬 Personalized shopping recommendations
* 🛍️ Product-aware assistant trained on PourByKay's catalog
* 🔄 Remembers returning customers across sessions
* ⚡ Graph-based memory retrieval instead of long chat history
* 🎁 Intelligent recommendations based on previous interests

---

# 💡 What Makes This Different?

Most AI chatbots only remember the current conversation.

This project stores customer preferences in **Cognee's Semantic Graph Memory**, allowing the assistant to remember users across different sessions and provide highly personalized recommendations without sending entire chat histories back to the language model.

---

# 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### AI

* Google Gemini 2.5 Flash
* Google Gen AI SDK

### Memory

* Cognee Cloud API
* Semantic Knowledge Graph
* Vector Search

---

# 🏗 Architecture

```text
                 User
                  │
                  ▼
         React Frontend
                  │
                  ▼
         Express Backend
          │            │
          │            │
          ▼            ▼
   Cognee Recall   Gemini 2.5 Flash
          │            │
          └─────┬──────┘
                ▼
      Personalized Response
                │
                ▼
        Cognee Remember
```

---

# 🔄 Workflow

### 1️⃣ User sends a message

```json
{
  "userId": "test-user-123",
  "userMessage": "I love Galaxy Wall Clocks."
}
```

---

### 2️⃣ Recall Previous Memory

The backend queries Cognee for previously stored customer preferences.

---

### 3️⃣ Generate AI Response

Gemini receives:

* Current user message
* Retrieved long-term memory
* Store context

and generates a personalized shopping recommendation.

---

### 4️⃣ Store New Memory

If the user expresses preferences like:

* I like...
* I love...
* I want...
* I prefer...
* I want to buy...

the backend automatically stores this information inside Cognee for future conversations.

---

# 🛍 Supported Products

* 🌌 Galaxy Wall Clocks
* 📱 Customised Phone Covers
* 📸 Personal Polaroids
* 🎁 Birthday Hampers
* 💌 Love Letters
* 📿 Phone Charms
* 🎵 Karan Aujla Phone Cases

---

# 📂 Project Structure

```text
pourbykay-ai-assistant/

├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│
├── assets/
│   ├── home.png
│   ├── chat.png
│   └── memory.png
│
├── .env.example
├── .gitignore
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/divyansh1727/artpour.git

cd pourbykay-ai-assistant
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
GEMINI_API_KEY=your_gemini_api_key

COGNEE_API_KEY=your_cognee_api_key
```

---

# 📄 .env.example

```env
GEMINI_API_KEY=xxxxxxxxxxxxxxxx

COGNEE_API_KEY=xxxxxxxxxxxxxxxx
```

---

# 🚫 .gitignore

```gitignore
node_modules
.env
dist
build
coverage
*.log
```

---

# 💬 Example Conversation

### First Visit

**User**

> I love Galaxy Wall Clocks.

**Assistant**

> Great choice! Our handcrafted Galaxy Wall Clock is one of our most loved products.

*(The preference is saved into Cognee.)*

---

### Returning Visit

**User**

> Hey, I'm back!

**Assistant**

> Welcome back! Last time you mentioned you loved our Galaxy Wall Clock. Based on your interest, you might also like our handcrafted customised phone covers and birthday hampers.

---

# 🚀 Future Improvements

* User Authentication
* Product Search
* Wishlist Memory
* Purchase History
* Voice Assistant
* Image Search
* Order Tracking
* Multi-language Support

---

# 🔒 Security

This repository does **not** include API keys or secrets.

Use your own credentials by creating a local `.env` file based on `.env.example`.

---

# ⭐ If You Like This Project

If you found this project useful, please consider giving it a **⭐ Star** on GitHub.

It really helps!

---

# 👨‍💻 Author

**Divyansh Singh**

Built during the **WeMakeDevs Hackathon** using:

* React
* Express.js
* Google Gemini 2.5 Flash
* Cognee Cloud Semantic Memory
* Tailwind CSS
