# 🎬 Movie Directory App

A high-performance Movie Directory application built with **Next.js 15**, **Tailwind CSS**, and **Docker**. This project allows users to browse, search, filter, and sort a curated list of top-rated movies with a polished, interactive UI.

## 🚀 Live Demo
**[Click Here to Visit Live App](https://movie-app-chi-dun.vercel.app/)**

## ✨ Features
- **🔍 Advanced Search:** Real-time search by movie title.
- **📂 Categorization:** Filter movies by Genre (Action, Sci-Fi, Drama, etc.).
- **⚡ Sorting:** Sort by **Rating (High to Low)**, **Year (Newest)**, or **Title (A-Z)**.
- **🎨 Interactive UI:** Smooth hover effects and animations using `framer-motion`.
- **📱 Fully Responsive:** Optimized for Mobile, Tablet, and Desktop.
- **🐳 Dockerized:** Fully containerized for consistent deployment environments.

## 🎨 Design Inspiration
* **Visual Style:** Adopted the trending **"Bento Grid"** layout popular on **Dribbble**.
* **Aesthetic:** Used a high-contrast Dark Mode with a signature **Rust Orange (#D14D35)** accent color to give it a cinematic feel.
* **Implementation:** Recreated complex UI elements like **Glassmorphism**, `backdrop-blur`, and deep rounded corners (3xl) using Tailwind CSS to match premium design references.

## 🛠 Tech Stack
- **Frontend:** Next.js 15 (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Deployment:** Vercel
- **Containerization:** Docker

## 🐳 How to Run Locally (via Docker)
To run the app in a containerized environment:

1. **Build the Image:**
   ```bash
   docker build -t movie-app .

### **Step 2: Ab Enter dabayein aur Ise Paste karein (Part 2 - AI & Future wala hissa)**
*(Ise theek Step 1 wale code ke neeche paste karna hai)*

```markdown
## 🤖 AI & Automation Usage
As part of the assignment requirements, AI tools were leveraged to accelerate development:
1.  **Dataset Generation:**
    - Used LLMs to generate a Python script (`generate_data.py`) that created a realistic `data.json` dataset with 20+ movies, including ratings, release years, and descriptions.
2.  **Code Optimization:**
    - Used AI to refactor the sorting algorithm and filter logic for better performance.
    - Generated the initial Dockerfile configuration to ensure best practices for Next.js containerization.

## 🧠 AI Prompts Used
Here are the specific prompts I used to accelerate development:
1.  **Data Generation:** "Create a JSON dataset of 20 realistic movies with fields: id, title, genre (Action, Sci-Fi, Drama), rating (1-10), release_year, description, and image_url. Ensure a mix of ratings."
2.  **Logic Refactoring:** "Refactor this filtering logic in Next.js to handle both search query and genre selection simultaneously, and add a sort function for rating."
3.  **Styling:** "Convert this CSS grid layout to Tailwind CSS classes with responsive breakpoints for mobile, tablet, and desktop."

## 🔮 What I'd Improve with 2 More Days
1.  **Pagination/Infinite Scroll:** Currently, all movies load at once. I would add infinite scroll for better performance with larger datasets.
2.  **User Favorites:** Add local storage functionality so users can "heart" movies and see them in a "My List" page.
3.  **Better Image Optimization:** Implement `next/image` with proper placeholders (blur effect) for smoother loading.