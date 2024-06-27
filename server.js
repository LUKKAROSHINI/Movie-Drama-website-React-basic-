const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 8000;

app.use(cors());

const kdramas = [
  { id: 1, title: 'Crash Landing on You', description: 'A South Korean heiress and a North Korean officer fall in love after an accident causes her to land in his territory.', imageUrl: 'https://th.bing.com/th/id/OIP.acHUiF8FZDxJzolaaZIY1gHaLH?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
  { id: 2, title: 'Goblin', description: 'A goblin cursed with immortality meets a young woman who can end his life and their fate becomes intertwined.', imageUrl: 'https://th.bing.com/th?id=ODL.5f068c7d82c716b2225e01c4e85611d8&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1' },
  { id: 3, title: 'Itaewon Class', description: 'An ex-con and his friends fight to make their ambitious dreams for their street bar a reality.', imageUrl: 'https://th.bing.com/th?id=ODL.f73db7518b853833bfa1844c121ba48b&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1' },
  { id: 4, title: 'Vincenzo', description: 'A Korean-Italian lawyer and Mafia consigliere returns to Korea to enact his own brand of justice.', imageUrl: 'https://th.bing.com/th?id=ODL.996404e2aeecac57d539f1c25a0c1803&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1' },
];

const cdramas = [
  { id: 1, title: 'The Untamed', description: 'Two talented disciples of respectable magical clans unit during a tragic incident.', imageUrl: 'https://th.bing.com/th?id=ODL.a5ee986e389ab85b3fd739da9e0ba2b6&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1' },
  { id: 2, title: 'Eternal Love', description: 'A love story between an immortal goddess and a prince.', imageUrl: 'https://th.bing.com/th?id=ODL.48338b627de58507343f6229943aba27&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1' },
  { id: 3, title: 'Love and Destiny', description: 'A love story between a deity and a young woman.', imageUrl: 'https://th.bing.com/th?id=ODL.d32fbdfde483fb62f6beab702ad2fbaa&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1' },
  { id: 4, title: 'Go Ahead', description: 'Three troubled youths find solace in their common experiences to become the best family that they can be for each other.', imageUrl: 'https://th.bing.com/th?id=ODL.818e65e05e4b0f2eb49dadb92a3e693b&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1' },
];

app.get('/movies', async (req, res) => {
  try {
    const apiKey = '2e4ba4e982189fa8bfc99e4f747559e0';
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    
    // Extract relevant movie data from the response
    const movies = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    }));
    
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

app.get('/kdramas', (req, res) => {
  res.json(kdramas);
});

app.get('/cdramas', (req, res) => {
  res.json(cdramas);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
