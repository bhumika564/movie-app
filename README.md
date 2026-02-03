# 🎬 Movie Directory App

A high-performance Movie Directory application built with **Next.js 15**, **Tailwind CSS**, and **Docker**. This project allows users to browse, search, filter, and sort a curated list of top-rated movies with a polished, interactive UI.

## 🚀 Live Demo
**[Click Here to Visit Live App](https://movie-app-chi-dun.vercel.app/)**

## ✨ Features
- **🔍 Advanced Search:** Real-time search by movie title.
- **📂 Categorization:** Filter movies by Genre (Action, Sci-Fi, Drama, etc.).
- **⚡ Sorting:** Sort by **Rating (High to Low)**, **Year (Newest)**, or **Title (A-Z)**.
- **🔗 Dynamic Movie Pages:** Every movie card is clickable, leading to a unique detail page using Next.js Dynamic Routes (`[id]`) with optimized metadata.
- **🎨 Interactive UI:** Smooth hover effects and entry animations using `framer-motion`.
- **📱 Fully Responsive:** Adaptive Bento-grid layout optimized for Mobile, Tablet, and Desktop.
- **🐳 Dockerized:** Fully containerized for consistent deployment across different environments.

## 🎨 Design Inspiration
* **Visual Style:** Adopted a trending **"Bento Grid"** layout, prioritizing scannability and a modern aesthetic.
* **Aesthetic:** High-contrast Dark Mode with a signature **Rust Orange (#D14D35)** accent color for a premium cinematic feel.
* **Implementation:** Advanced UI elements including **Glassmorphism**, `backdrop-blur`, and deep rounded corners (`rounded-[3rem]`) implemented via Tailwind CSS.
* **Real Posters:** Integrated high-quality movie posters with a consistent **2:3 aspect ratio** to maintain a professional directory look.



## 🛠 Tech Stack
- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Deployment:** Vercel
- **Containerization:** Docker

## 🤖 AI & Automation Usage
As part of the assignment requirements, AI tools were leveraged to accelerate development:
1. **Dataset Transformation:**
   - Used AI to integrate a **Real-world Movie Dataset** (TMDB style) into the local `data.json`, replacing placeholder text with actual movie plots and valid poster URLs.
2. **Code Optimization:**
   - Used AI to refactor the sorting algorithm and filtering logic for O(n) performance.
   - Generated the initial Dockerfile configuration to ensure best practices for Next.js multi-stage builds.
3. **Image Optimization Configuration:**
   - Used AI to correctly configure `remotePatterns` in `next.config.ts` to securely allow external images from `image.tmdb.org`.

## 🧠 AI Prompts Used
Here are the specific prompts I used to accelerate development:
1. **Data Generation:** "Create a JSON dataset of 20 realistic movies (like Avatar, Batman, Inception) with fields: id, title, genre, rating, release_year, description, and image_url. Use TMDB poster links."
2. **Logic Refactoring:** "Refactor this filtering logic in Next.js to handle both search query and genre selection simultaneously, and add a sort function for rating."
3. **Dynamic Routing:** "Help me set up a dynamic route `app/[id]/page.tsx` that finds a movie by its ID from my local JSON file and displays its details with a cinematic layout."

## 🔮 What I'd Improve with 2 More Days
1. **Pagination/Infinite Scroll:** Currently, all movies load at once. I would add infinite scroll for better performance with larger datasets.
2. **User Favorites:** Add local storage functionality so users can "heart" movies and see them in a persistent "My Watchlist" page.
3. **Live API Integration:** Transition from the local JSON file to a live fetch from the TMDB API for real-time updates and more movie metadata.

## 🐳 How to Run Locally (via Docker)
To run the app in a containerized environment:

1. **Build the Image:**
   ```bash
   docker build -t movie-app .

## 📁 Project Structure
- `/app`: Contains all routes (Home, Dynamic Movie Details).
- `/app/data.json`: The central source of truth for the movie dataset.
- `/app/type.ts`: TypeScript interfaces for type-safe data handling.
- `next.config.ts`: Configuration for external image permissions.


## 👤 Author
**Bhumika**
- [GitHub](https://github.com/bhumika564)