import pandas as pd
import json
import ast
import os

csv_path = r'C:\Users\asus\OneDrive\Desktop\tmdb_5000_movies.csv'

try:
    df = pd.read_csv(csv_path)
    # Filter Top 250 Movies
    top_movies = df[df['vote_count'] > 1000].sort_values(by='vote_average', ascending=False).head(250)

    movie_list = []
    for i, (idx, row) in enumerate(top_movies.iterrows()):
        try:
            genres = ast.literal_eval(row['genres'])
            genre_name = genres[0]['name'] if genres else "Drama"
        except:
            genre_name = "Drama"

        movie_id = int(row['id'])
        year = int(row['release_date'].split('-')[0]) if pd.notnull(row['release_date']) else 2024
        
        # Har movie ID ke liye ek unique fixed image (No repeats!)
        image_url = f"https://picsum.photos/seed/{movie_id}/500/750"

        movie_list.append({
            "id": movie_id,
            "title": row['title'],
            "genre": genre_name,
            "rating": round(float(row['vote_average']), 1),
            "release_year": year,
            "description": row['overview'] if pd.notnull(row['overview']) else "No summary available.",
            "image_url": image_url
        })

    if not os.path.exists('app'):
        os.makedirs('app')

    with open('app/data.json', 'w') as f:
        json.dump(movie_list, f, indent=4)

    print("DONE! 250 UNIQUE movies generated in app/data.json")

except Exception as e:
    print(f"Error occurred: {e}")