import React from 'react';
import  './Home page.css';
function HomePage({ kdramas, cdramas, movies, selectedGenre, fetchRecommendations, toggleWatchList, watchList }) {
  return (
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
  );
}

export default HomePage;
