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

## 🛠 Tech Stack
- **Frontend:** Next.js 15 (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Deployment:** Vercel
- **Containerization:** Docker

## 🤖 AI & Automation Usage
As part of the assignment requirements, AI tools were leveraged to accelerate development:
1.  **Dataset Generation:**
    - Used LLMs to generate a Python script (`generate_data.py`) that created a realistic `data.json` dataset with 20+ movies, including ratings, release years, and descriptions.
2.  **Code Optimization:**
    - Used AI to refactor the sorting algorithm and filter logic for better performance.
    - Generated the initial Dockerfile configuration to ensure best practices for Next.js containerization.

## 🐳 How to Run Locally (via Docker)
To run the app in a containerized environment:

1. **Build the Image:**
   ```bash
   docker build -t movie-app .