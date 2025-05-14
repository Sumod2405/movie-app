// src/components/MovieSearch.jsx
import React, { useState, useEffect } from 'react';
import './MovieSearch.css';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  // Fetch movies based on query
  useEffect(() => {
    const fetchMovies = async () => {
      if (query.length < 1) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${query}&type=movie&apikey=b252049e&page=${page}`
        );
        const data = await res.json();

        if (data.Response === 'True') {
          setResults(data.Search);
        } else {
          setResults([]);
          setError('No results found.');
        }
      } catch (err) {
        setError('Failed to fetch movies.');
      } finally {
        setLoading(false);
      }
    };

    const delaySearch = setTimeout(() => {
      fetchMovies();
    }, 500); // delay typing by 0.5 sec

    return () => clearTimeout(delaySearch);
  }, [query, page]); // Re-run effect when query or page changes

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1); // reset page on new search
        }}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* 🎬 Placeholder content when no search is typed */}
      {query.length < 1 && (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#444',
          }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>🎬 Welcome to MovieFinder</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
            Search from thousands of movies instantly.
          </p>
          <p style={{ fontSize: '1rem', color: '#666' }}>
            Type a movie name above to get started.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/744/744922.png"
            alt="Movie icon"
            style={{ width: '120px', marginTop: '30px', opacity: 0.8 }}
          />
        </div>
      )}

      <div className="movie-grid">
        {results.length > 0 &&
          results.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200'}
                alt={movie.Title}
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))}
      </div>

      {/* Pagination */}
      {results.length > 0 && (
        <div className="pagination">
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
            Prev
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={results.length < 10} // Disable "Next" if fewer than 10 results
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
