import json
import random

# 5 Popular Genres
genres = ["Action", "Sci-Fi", "Drama", "Comedy", "Thriller"]

# Empty list jisme movies store hongi
movies = []

print("Generating data...")

for i in range(1, 21):  # 20 movies generate kar rahe hain
    movie = {
        "id": i,
        "title": f"Super Movie {i}",
        "genre": random.choice(genres),
        "rating": round(random.uniform(5.0, 9.9), 1),
        "release_year": random.randint(2015, 2024),
        "description": f"This is a thrilling description for Super Movie {i}. Watch it now!",
        "image_url": "https://placehold.co/600x400/png?text=Movie+Poster"
    }
    movies.append(movie)

# Data ko src folder ke andar data.json naam se save karein
# Note: Agar 'src' folder nahi hai, to path sirf "data.json" rakhein
try:
    with open("src/data.json", "w") as f:
        json.dump(movies, f, indent=4)
    print("Success! 'src/data.json' file ban gayi hai.")
except FileNotFoundError:
    # Agar src folder nahi mila (kabhi kabhi root me hota hai)
    with open("data.json", "w") as f:
        json.dump(movies, f, indent=4)
    print("Success! 'data.json' file root folder me ban gayi hai.")