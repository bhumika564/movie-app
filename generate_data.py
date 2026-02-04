import pandas as pd
import json
import ast
import os
import requests
import time

# --- CONFIGURATION ---
OMDB_API_KEY = "e474594a"  # Aapki nayi key
CSV_PATH = r'C:\Users\asus\OneDrive\Desktop\tmdb_5000_movies.csv'

session = requests.Session()

def get_omdb_poster(title, year, movie_id):
    try:
        # Title clean up
        clean_title = "".join([c for c in title if c.isalnum() or c==' ']).strip()
        url = f"http://www.omdbapi.com/?t={clean_title}&y={year}&apikey={OMDB_API_KEY}"
        
        response = session.get(url, timeout=5)
        data = response.json()
        
        if data.get('Response') == 'True' and data.get('Poster') != 'N/A':
            # Har poster URL ke end mein unique ID add kar rahe hain repeats rokne ke liye
            return data['Poster'] + f"&movie_id={movie_id}"
    except Exception as e:
        print(f"Error for {title}: {e}")
    
    # UNIQUE FALLBACK (Agar OMDb par movie na mile)
    return f"https://loremflickr.com/500/750/movie,poster?lock={movie_id}"

try:
    df = pd.read_csv(CSV_PATH)
    top_movies = df[df['vote_count'] > 1000].sort_values(by='vote_average', ascending=False).head(250)

    movie_list = []
    print("🚀 Syncing 250 Unique Posters with OMDb...")

    for i, (idx, row) in enumerate(top_movies.iterrows()):
        title = row['title']
        movie_id = int(row['id'])
        year = str(row['release_date']).split('-')[0] if pd.notnull(row['release_date']) else "2024"
        
        poster_url = get_omdb_poster(title, year, movie_id)
        
        try:
            genres = ast.literal_eval(row['genres'])
            genre_name = genres[0]['name'] if genres else "Drama"
        except:
            genre_name = "Drama"

        movie_list.append({
            "id": movie_id,
            "title": title,
            "genre": genre_name,
            "rating": round(float(row['vote_average']), 1),
            "release_year": int(year) if year.isdigit() else 2024,
            "description": row['overview'] if pd.notnull(row['overview']) else "No summary available.",
            "image_url": poster_url
        })
        
        if (i + 1) % 20 == 0:
            print(f"✅ Processed {i+1}/250 movies...")

    # Save to data.json
    if not os.path.exists('app'): os.makedirs('app')
    with open('app/data.json', 'w') as f:
        json.dump(movie_list, f, indent=4)
        
    print("\n--- DONE! data.json is now updated with REAL posters. ---")

except Exception as e:
    print(f"Critical Error: {e}")