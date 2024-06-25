import { useState } from 'react';
import './App.css';
import Search from './search/Search';
import Welcome from './welcome/Welcome';

export enum Pages { Welcome, Search, Recipe, }

function App() {
  const [page, setPage] = useState(Pages.Welcome);
  let content;
  let search = () => { setPage(Pages.Search) };

  switch (page) {
    case Pages.Welcome: {
      content =
        <Welcome onClickEvent={search} />
      break;
    }
    case Pages.Search: {
      content =
        <Search />
      break;
    }
      // default: {
      // content =
      <Welcome />
    // break;
    // }
  }

  return (
    <>
      {content}
    </>
  );
}

export default App;
