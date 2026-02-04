
# 🎬 Movie Diary (Letterboxd Inspired)

A premium, cinematic movie exploration platform built with **Next.js 15**, featuring an automated data pipeline and a high-fidelity UI inspired by Letterboxd.

## 📖 Project Overview

**Movie Diary** is a premium, high-performance web application designed for cinephiles to discover, track, and curate their favorite films. Moving beyond a basic directory, this project implements a full-scale **Data Engineering pipeline** using **Python and Pandas** to transform raw datasets into a refined cinematic collection. Built with the cutting-edge **Next.js 15 App Router**, the platform delivers a seamless, "Letterboxd-inspired" user experience, featuring real-time metadata enrichment via the **OMDb API**, immersive glassmorphism UI, and fully containerized deployment with **Docker**.

## 🚀 Live Demo
**[Click Here to Visit Live App](https://movie-app-chi-dun.vercel.app/)**

## ✨ Features

* **🎬 Movie Diary Concept:** Transformed the static directory into a personal experience where users can track films using **"Watched"** (tick) and **"Save"** (bookmark) interactions.
* **🖼️ Official Theatrical Posters:** Integrated the **OMDb API** to dynamically fetch real-world movie posters, giving the app an authentic cinematic look.
* **⚙️ Automated Data Pipeline:** Leveraged **Python and Pandas** to automate the processing of 5,000+ records, resulting in a refined and curated "Top 250" dataset.
* **🟢 Letterboxd-Inspired UI:** A premium dark-mode aesthetic inspired by Letterboxd, utilizing the iconic **Green (#00e054)** accents and glassmorphism effects.
* **🔍 Intelligent Search & Filtering:** Real-time search functionality combined with genre-based filters and a dynamic title counter that displays live results.
* **🔗 Dynamic Routing (Next.js 15):** Implemented immersive movie detail pages using the latest Next.js App Router, featuring poster-based blurred backgrounds.
* **⚡ Performance Optimized:** Hardware-accelerated animations with `framer-motion` and optimized image delivery via Next.js `remotePatterns`.
* **📱 Fully Responsive:** A fluid Bento-grid layout that works flawlessly across Mobile, Tablet, and Desktop environments.
* **🐳 Dockerized:** Fully containerized for consistent deployment across any system.

<!-- ## 🎨 Design Inspiration
* **Visual Style:** Adopted a trending **"Bento Grid"** layout, prioritizing scannability and a modern aesthetic.
* **Aesthetic:** High-contrast Dark Mode with a signature **Rust Orange (#D14D35)** accent color for a premium cinematic feel.
* **Implementation:** Advanced UI elements including **Glassmorphism**, `backdrop-blur`, and deep rounded corners (`rounded-[3rem]`) implemented via Tailwind CSS.
* **Real Posters:** Integrated high-quality movie posters with a consistent **2:3 aspect ratio** to maintain a professional directory look.
 -->


## 🛠 Tech Stack
- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide Icons
- **Data Layer:** Python, Pandas (Data Cleaning & Curation)
- **APIs:** OMDb API (Metadata & Poster enrichment)
- **Deployment:** Vercel & Docker

## ⛓️ Data Pipeline & Automation
To ensure data integrity and theatrical authenticity:
1. **Extraction:** Processed raw TMDB CSV data using **Python & Pandas**.
2. **Curation:** Filtered top 250 movies based on weighted ratings and vote counts.
3. **Enrichment:** Automated API calls to **OMDb** to sync official posters and resolve image metadata.
4. **Cache Optimization:** Implemented unique ID-based cache busting for movie assets to ensure a seamless visual experience.

## 🤖 AI & Automation Usage
1. **API Integration:** Leveraged AI to architect a robust fetching logic for OMDb API with fallback mechanisms (LoremFlickr).
2. **UI Refactoring:** Used AI to implement complex **CSS backdrop-filters** and Letterboxd-inspired typography scales.
3. **Python Scripting:** Generated the core logic for the Pandas-based curation script to handle large-scale dataset transformation.

## 🧠 AI Prompts Used
Here are the specific prompts I used to accelerate development:
1. **Data Generation:** "Create a JSON dataset of 20 realistic movies (like Avatar, Batman, Inception) with fields: id, title, genre, rating, release_year, description, and image_url. Use TMDB poster links."
2. **Logic Refactoring:** "Refactor this filtering logic in Next.js to handle both search query and genre selection simultaneously, and add a sort function for rating."
3. **Dynamic Routing:** "Help me set up a dynamic route `app/[id]/page.tsx` that finds a movie by its ID from my local JSON file and displays its details with a cinematic layout."

## 🔮 What I'd Improve with 2 More Days
1. **Pagination/Infinite Scroll:** Currently, all movies load at once. I would add infinite scroll for better performance with larger datasets.
2. **User Favorites:** Add local storage functionality so users can "heart" movies and see them in a persistent "My Watchlist" page.
3. **Live API Integration:** Transition from the local JSON file to a live fetch from the TMDB API for real-time updates and more movie metadata.

## 🛠 Installation & Setup

### 💻 Running Locally
To get the project up and running on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/bhumika564/movie-app.git](https://github.com/bhumika564/movie-app.git)
   cd movie-app

2. **Install Dependencies:**
   ```bash
   npm install

3. **Run the development server:**
   ```bash
   npm run dev

## 🐳 How to Run Locally (via Docker)
To run the app in a containerized environment:

1. **Build the Docker Image:**
   ```bash
   docker build -t movie-diary-app .

2. **Run the Container:**
   ```bash
   docker run -p 3000:3000 movie-diary-app

2. **Access the Application:**
   Once the container is running, the app will be available at
   http://localhost:3000.

## 📁 Project Structure
- `/app`: Contains all routes (Home, Dynamic Movie Details).
- `/app/data.json`: The central source of truth for the movie dataset.
- `/app/type.ts`: TypeScript interfaces for type-safe data handling.
- `next.config.ts`: Configuration for external image permissions.


## 👤 Author
**Bhumika**
- [GitHub](https://github.com/bhumika564)