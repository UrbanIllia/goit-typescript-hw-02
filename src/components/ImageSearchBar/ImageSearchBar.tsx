import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import css from './ImageSearchBar.module.css';

type ImageSearchBarProps = {
  onSubmit: (query: string) => void;
};

const ImageSearchBar = ({ onSubmit }: ImageSearchBarProps) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error('Єй! Ну ти чого?! Може введеш щось нормальне?');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </header>
  );
};

export default ImageSearchBar;
