import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

import Login from './Login';
import Register from './Register';
import HeartIcon from './HeartIcon';
import  './Home page';
function App() {
  const [kdramas, setKdramas] = useState([]);
  const [cdramas, setCdramas] = useState([]);
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    fetchKdramas();
    fetchCdramas();
    fetchMovies();
  }, []);

  const fetchKdramas = () => {
    fetch('http://localhost:8000/kdramas')
      .then(response => response.json())
      .then(data => setKdramas(data))
      .catch(error => console.error('Error fetching K-dramas:', error));
  };

  const fetchCdramas = () => {
    fetch('http://localhost:8000/cdramas')
      .then(response => response.json())
      .then(data => setCdramas(data))
      .catch(error => console.error('Error fetching C-dramas:', error));
  };

  const fetchMovies = () => {
    fetch('http://localhost:8000/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  };

  const fetchRecommendations = (genre) => {
    if (genre === 'kdramas') {
      fetchKdramas();
    } else if (genre === 'cdramas') {
      fetchCdramas();
    } else if (genre === 'movies') {
      fetchMovies();
    }
    setSelectedGenre(genre);
  };

  const toggleWatchList = (item) => {
    const existingIndex = watchList.findIndex((i) => i.id === item.id);
    if (existingIndex !== -1) {
      setWatchList(watchList.filter((i) => i.id !== item.id));
    } else {
      setWatchList([...watchList, item]);
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>DramaChic</h1>
          <p>Your ultimate guide to K-dramas, C-dramas, and Movies!</p>
          <div className="header-links">
            <Link to="/watchlist" className="heart-icon-link">
              <HeartIcon filled={watchList.length > 0} className="watchlist-icon" />
            </Link>
            <Link to="/login" className="login-button">Login</Link>
            <Link to="/register" className="register-button">Register</Link>
          </div>
        </header>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watchlist" element={
            <section className="watch-list-section">
              <h2>My Watch List</h2>
              <ul>
                {watchList.map(item => (
                  <li key={item.id} className="list-item">
                    <img src={item.imageUrl} alt={item.title} />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <button onClick={() => toggleWatchList(item)}>Remove from Watch List</button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          } />
          <Route path="/" element={
            <main className="App-main">
              <div className="genre-buttons">
                <button onClick={() => fetchRecommendations('kdramas')}>View K-Dramas</button>
                <button onClick={() => fetchRecommendations('cdramas')}>View C-Dramas</button>
                <button onClick={() => fetchRecommendations('movies')}>View Movies</button>
              </div>
              <section className="drama-section">
                <h2>
                  {selectedGenre === 'kdramas' && 'K-Drama Recommendations'}
                  {selectedGenre === 'cdramas' && 'C-Drama Recommendations'}
                  {selectedGenre === 'movies' && 'Movie Recommendations'}
                </h2>
                <ul>
                  {selectedGenre === 'kdramas' && kdramas.map(drama => (
                    <li key={drama.id} className="list-item">
                      <img src={drama.imageUrl} alt={drama.title} />
                      <div>
                        <h3>{drama.title}</h3>
                        <p>{drama.description}</p>
                        <button onClick={() => toggleWatchList(drama)}>
                          {watchList.some(item => item.id === drama.id) ? 'Remove from Watch List' : 'Add to Watch List'}
                        </button>
                      </div>
                    </li>
                  ))}
                  {selectedGenre === 'cdramas' && cdramas.map(drama => (
                    <li key={drama.id} className="list-item">
                      <img src={drama.imageUrl} alt={drama.title} />
                      <div>
                        <h3>{drama.title}</h3>
                        <p>{drama.description}</p>
                        <button onClick={() => toggleWatchList(drama)}>
                          {watchList.some(item => item.id === drama.id) ? 'Remove from Watch List' : 'Add to Watch List'}
                        </button>
                      </div>
                    </li>
                  ))}
                  {selectedGenre === 'movies' && movies.map(movie => (
                    <li key={movie.id} className="list-item">
                      <img src={movie.imageUrl} alt={movie.title} />
                      <div>
                        <h3>{movie.title}</h3>
                        <p>{movie.description}</p>
                        <button onClick={() => toggleWatchList(movie)}>
                          {watchList.some(item => item.id === movie.id) ? 'Remove from Watch List' : 'Add to Watch List'}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </main>
          } />
        </Routes>
        <footer className="App-footer">
          <p>&copy; 2024 DramaChic. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
