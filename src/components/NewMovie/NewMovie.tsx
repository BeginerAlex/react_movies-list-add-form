import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Omit<Movie, 'id'>) => void;
};

const initialMovieData = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movieData, setMovieData] = useState(initialMovieData);

  const isFormValid =
    movieData.title.trim() !== '' &&
    movieData.imgUrl.trim() !== '' &&
    movieData.imdbUrl.trim() !== '' &&
    movieData.imdbId.trim() !== '';

  const handleChange = (name: string, value: string) => {
    setMovieData(prevData => ({ ...prevData, [name]: value }));
  };

  const hundleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onAdd(movieData as Omit<Movie, 'id'>);

    setMovieData(initialMovieData);

    setCount(currentCount => currentCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={hundleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieData.title}
        onChange={event => {
          handleChange('title', event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieData.description}
        onChange={event => {
          handleChange('description', event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieData.imgUrl}
        onChange={event => {
          handleChange('imgUrl', event);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieData.imdbUrl}
        onChange={event => {
          handleChange('imdbUrl', event);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieData.imdbId}
        onChange={event => {
          handleChange('imdbId', event);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
