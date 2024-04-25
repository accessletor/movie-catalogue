// import { spyOn } from 'jest-mock';
// import FavoriteMovieSearchPresenter
//   from '../src/scripts/views/pages/liked-movies/favorite-movie-search-presenter';
// import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';

// describe('Searching movies', () => {
//   let presenter;

//   const searchMovies = (query) => {
//     const queryElement = document.getElementById('query');
//     queryElement.value = query;

//     queryElement.dispatchEvent(new Event('change'));
//   };

//   const setMovieSearchContainer = () => {
//     document.body.innerHTML = `
//       <div id="movie-search-container">
//         <input id="query" type="text">
//         <div class="movie-result-container">
//           <ul class="movies">
//           </ul>
//         </div>
//       </div>
//     `;
//   };

//   const constructPresenter = () => {
//     spyOn(FavoriteMovieIdb, 'searchMovies');
//     presenter = new FavoriteMovieSearchPresenter({
//       favoriteMovies: FavoriteMovieIdb,
//     });
//   };

//   beforeEach(() => {
//     setMovieSearchContainer();
//     constructPresenter();
//   });
//   it('should be able to capture the query typed by the user', () => {
//     FavoriteMovieIdb.searchMovies.mockImplementation(() => []);

//     searchMovies('film a');

//     expect(presenter.latestQuery).toEqual('film a');
//   });

//   it('should ask the model to search for liked movies', () => {
//     FavoriteMovieIdb.searchMovies.mockImplementation(() => []);

//     searchMovies('film a');

//     expect(FavoriteMovieIdb.searchMovies).toHaveBeenCalledWith('film a');
//   });

//   it('should show the found movies', () => {
//     presenter._showFoundMovies([{ id: 1 }]);
//     expect(document.querySelectorAll('.movie-item').length).toEqual(1);

//     presenter._showFoundMovies([
//       { id: 1, title: 'Satu' },
//       { id: 2, title: 'Dua' },
//     ]);
//     expect(document.querySelectorAll('.movie-item').length).toEqual(2);
//   });

//   it('should show the title of the found movies', () => {
//     presenter._showFoundMovies([
//       { id: 1, title: 'Satu' },
//     ]);

//     expect(document.querySelectorAll('.movie__title')
//       .item(0).textContent)
//       .toEqual('Satu');

//     presenter._showFoundMovies([
//       { id: 1, title: 'Satu' },
//       { id: 2, title: 'Dua' },
//     ]);

//     const movieTitles = document.querySelectorAll('.movie__title');

//     expect(movieTitles.item(0).textContent).toEqual('Satu');
//     expect(movieTitles.item(1).textContent).toEqual('Dua');
//   });

//   it('should show - for found movie without title', () => {
//     presenter._showFoundMovies([{ id: 1 }]);

//     expect(document.querySelectorAll('.movie__title')
//       .item(0).textContent)
//       .toEqual('-');
//   });

//   it('should show the movies found by Favorite Movies', (done) => {
//     document
//       .getElementById('movie-search-container')
//       .addEventListener('movies:searched:updated', () => {
//         expect(document.querySelectorAll('.movie-item').length).toEqual(3);

//         done();
//       });

//     FavoriteMovieIdb.searchMovies.mockImplementation((query) => {
//       if (query === 'film a') {
//         return [
//           { id: 111, title: 'film abc' },
//           { id: 222, title: 'ada juga film abcde' },
//           { id: 333, title: 'ini juga boleh film a' },
//         ];
//       }

//       return [];
//     });

//     searchMovies('film a');
//   });

//   it('should show the name of the movies found by Favorite Movies', (done) => {
//     document
//       .getElementById('movie-search-container')
//       .addEventListener('movies:searched:updated', () => {
//         const movieTitles = document.querySelectorAll('.movie__title');

//         expect(movieTitles.item(0).textContent).toEqual('film abc');
//         expect(movieTitles.item(1).textContent).toEqual('ada juga film abcde');
//         expect(movieTitles.item(2).textContent).toEqual('ini juga boleh film a');

//         done();
//       });

//     FavoriteMovieIdb.searchMovies.mockImplementation((query) => {
//       if (query === 'film a') {
//         return [
//           { id: 111, title: 'film abc' },
//           { id: 222, title: 'ada juga film abcde' },
//           { id: 333, title: 'ini juga boleh film a' },
//         ];
//       }

//       return [];
//     });

//     searchMovies('film a');
//   });
// });
// dua
import {
  beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import FavoriteMovieSearchPresenter from '../src/scripts/views/pages/liked-movies/favorite-movie-search-presenter';
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import FavoriteMovieView
  from '../src/scripts/views/pages/liked-movies/favorite-movie-view';

describe('Searching movies', () => {
  let presenter;
  let favoriteMovies;
  let view;

  const searchMovies = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setMovieSearchContainer = () => {
    view = new FavoriteMovieView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteMovies = {
      getAllMovies: jest.fn(),
      searchMovies: jest.fn(),
    };
    presenter = new FavoriteMovieSearchPresenter({
      favoriteMovies,
      view,
    });
  };

  beforeEach(() => {
    setMovieSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    // it('should be able to capture the query typed by the user', () => {
    //   favoriteMovies.searchMovies.mockImplementation(() => []);
    //   searchMovies('film a');
    //   expect(presenter.latestQuery).toEqual('film a');
    // });
    it('should be able to capture the query typed by the user', () => {
      favoriteMovies.searchMovies.mockResolvedValue([]);
      searchMovies('film a');
      expect(presenter.latestQuery).toEqual('film a');
      // Pastikan pemanggilan fungsi callback terjadi dengan benar
      expect(favoriteMovies.searchMovies).toHaveBeenCalledWith('film a');
    });
    it('should ask the model to search for liked movies', () => {
      favoriteMovies.searchMovies.mockImplementation(() => []);
      searchMovies('film a');
      expect(favoriteMovies.searchMovies).toHaveBeenCalledWith('film a');
    });
    // it('should show the found movies', () => {
    //   presenter._showFoundMovies([{ id: 1 }]);
    //   expect(document.querySelectorAll('.movie-item').length).toEqual(1);
    //   presenter._showFoundMovies([
    //     { id: 1, title: 'Satu' },
    //     { id: 2, title: 'Dua' },
    //   ]);
    //   expect(document.querySelectorAll('.movie-item').length).toEqual(2);
    // });
    // it('should show the title of the found movies', () => {
    //   presenter._showFoundMovies([{ id: 1, title: 'Satu' }]);
    //   expect(document.querySelectorAll('.movie__title')
    //     .item(0).textContent)
    //     .toEqual('Satu');
    //   presenter._showFoundMovies([
    //     { id: 1, title: 'Satu' },
    //     { id: 2, title: 'Dua' },
    //   ]);
    //   const movieTitles = document.querySelectorAll('.movie__title');
    //   expect(movieTitles.item(0).textContent).toEqual('Satu');
    //   expect(movieTitles.item(1).textContent).toEqual('Dua');
    // });
    // it('should show - for found movie without title', () => {
    //   presenter._showFoundMovies([{ id: 1 }]);
    //   expect(document.querySelectorAll('.movie__title')
    //     .item(0).textContent)
    //     .toEqual('-');
    // });
    it('should show the movies found by Favorite Movies', (done) => {
      document
        .getElementById('movies').addEventListener('movies:updated', () => {
          expect(document.querySelectorAll('.movie-item').length).toEqual(3);
          done();
        });
      favoriteMovies.searchMovies.mockImplementation((query) => {
        if (query === 'film a') {
          return [
            { id: 111, title: 'film abc' },
            { id: 222, title: 'ada juga film abcde' },
            { id: 333, title: 'ini juga boleh film a' },
          ];
        }
        return [];
      });
      searchMovies('film a');
    });
    it('should show the name of the movies found by Favorite Movies', (done) => {
      document
        .getElementById('movies').addEventListener('movies:updated', () => {
          const movieTitles = document.querySelectorAll('.movie__title');
          expect(movieTitles.item(0).textContent).toEqual('film abc');
          expect(movieTitles.item(1).textContent).toEqual('ada juga film abcde');
          expect(movieTitles.item(2).textContent).toEqual('ini juga boleh film a');
          done();
        });
      favoriteMovies.searchMovies.mockImplementation((query) => {
        if (query === 'film a') {
          return [
            { id: 111, title: 'film abc' },
            { id: 222, title: 'ada juga film abcde' },
            { id: 333, title: 'ini juga boleh film a' },
          ];
        }
        return [];
      });
      searchMovies('film a');
    });
    it('should show - when the movie returned does not contain a title', (done) => {
      document.getElementById('movies').addEventListener('movies:updated', () => {
        const movieTitles = document.querySelectorAll('.movie__title');
        expect(movieTitles.item(0).textContent)
          .toEqual('-');

        done();
      });

      favoriteMovies.searchMovies.mockImplementation((query) => {
        if (query === 'film a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchMovies('film a');
    });
  });
  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteMovies.getAllMovies.mockImplementation(() => []);
      searchMovies(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });
    it('should show all favorite movies', () => {
      favoriteMovies.getAllMovies.mockImplementation(() => []);
      searchMovies('    ');
      expect(favoriteMovies.getAllMovies).toHaveBeenCalled();
    });
  });
  describe('When no favorite movies could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('movies').addEventListener('movies:updated', () => {
          expect(document.querySelectorAll('.movie-item__not__found').length).toEqual(1);
          done();
        });
      favoriteMovies.searchMovies.mockImplementation((query) => []);
      searchMovies('film a');
    });
    it('should not show any movie', (done) => {
      document.getElementById('movies').addEventListener('movies:updated', () => {
        expect(document.querySelectorAll('.movie-item').length).toEqual(0);
        done();
      });
      favoriteMovies.searchMovies.mockImplementation((query) => []);
      searchMovies('film a');
    });
  });
});

// tiga
// import FavoriteMovieSearchPresenter from '../src/scripts/views/pages/liked-movies/favorite-movie-search-presenter';
// import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';

// describe('Searching movies', () => {
//   let presenter;
//   let favoriteMovies;

//   const searchMovies = (query) => {
//     const queryElement = document.getElementById('query');
//     queryElement.value = query;

//     queryElement.dispatchEvent(new Event('change'));
//   };

//   const setMovieSearchContainer = () => {
//     document.body.innerHTML = `
//       <div id="movie-search-container">
//         <input id="query" type="text">
//         <div class="movie-result-container">
//           <ul class="movies">
//           </ul>
//         </div>
//       </div>
//     `;
//   };

//   const constructPresenter = () => {
//     favoriteMovies = {
//       getAllMovies: jest.fn(),
//       searchMovies: jest.fn(),
//     };
//     presenter = new FavoriteMovieSearchPresenter({
//       favoriteMovies,
//     });
//   };

//   beforeEach(() => {
//     setMovieSearchContainer();
//     constructPresenter();
//   });

//   describe('When query is not empty', () => {
//     it('should be able to capture the query typed by the user', () => {
//       favoriteMovies.searchMovies.mockImplementation(() => []);
//       searchMovies('film a');
//       expect(presenter.latestQuery).toEqual('film a');
//     });

//     it('should ask the model to search for liked movies', () => {
//       favoriteMovies.searchMovies.mockImplementation(() => []);
//       searchMovies('film a');
//       expect(favoriteMovies.searchMovies).toHaveBeenCalledWith('film a');
//     });

//     it('should show the found movies', () => {
//       presenter._showFoundMovies([{ id: 1 }]);
//       expect(document.querySelectorAll('.movie-item').length).toEqual(1);
//       presenter._showFoundMovies([
//         { id: 1, title: 'Satu' },
//         { id: 2, title: 'Dua' },
//       ]);
//       expect(document.querySelectorAll('.movie-item').length).toEqual(2);
//     });

//     it('should show the title of the found movies', () => {
//       presenter._showFoundMovies([{ id: 1, title: 'Satu' }]);
//       expect(document.querySelectorAll('.movie__title')
//         .item(0).textContent)
//         .toEqual('Satu');
//       presenter._showFoundMovies([
//         { id: 1, title: 'Satu' },
//         { id: 2, title: 'Dua' },
//       ]);
//       const movieTitles = document.querySelectorAll('.movie__title');
//       expect(movieTitles.item(0).textContent).toEqual('Satu');
//       expect(movieTitles.item(1).textContent).toEqual('Dua');
//     });

//     it('should show "-" for found movie without title', () => {
//       presenter._showFoundMovies([{ id: 1 }]);
//       expect(document.querySelectorAll('.movie__title')
//         .item(0).textContent)
//         .toEqual('-');
//     });

//     it('should show the movies found by Favorite Movies', (done) => {
//       document
//         .getElementById('movie-search-container')
//         .addEventListener('movies:searched:updated', () => {
//           expect(document.querySelectorAll('.movie-item').length).toEqual(3);
//           done();
//         });
//       favoriteMovies.searchMovies.mockImplementation((query) => {
//         if (query === 'film a') {
//           return [
//             { id: 111, title: 'film abc' },
//             { id: 222, title: 'ada juga film abcde' },
//             { id: 333, title: 'ini juga boleh film a' },
//           ];
//         }
//         return [];
//       });
//       searchMovies('film a');
//     });

//     it('should show the name of the movies found by Favorite Movies', (done) => {
//       document
//         .getElementById('movie-search-container')
//         .addEventListener('movies:searched:updated', () => {
//           const movieTitles = document.querySelectorAll('.movie__title');
//           expect(movieTitles.item(0).textContent).toEqual('film abc');
//           expect(movieTitles.item(1).textContent).toEqual('ada juga film abcde');
//           expect(movieTitles.item(2).textContent).toEqual('ini juga boleh film a');
//           done();
//         });
//       favoriteMovies.searchMovies.mockImplementation((query) => {
//         if (query === 'film a') {
//           return [
//             { id: 111, title: 'film abc' },
//             { id: 222, title: 'ada juga film abcde' },
//             { id: 333, title: 'ini juga boleh film a' },
//           ];
//         }
//         return [];
//       });
//       searchMovies('film a');
//     });
//   });

//   describe('When query is empty', () => {
//     it('should capture the query as empty', () => {
//       favoriteMovies.getAllMovies.mockImplementation(() => []);
//       searchMovies(' ');
//       expect(presenter.latestQuery.length).toEqual(0);

//       searchMovies('    ');
//       expect(presenter.latestQuery.length).toEqual(0);

//       searchMovies('');
//       expect(presenter.latestQuery.length).toEqual(0);

//       searchMovies('\t');
//       expect(presenter.latestQuery.length).toEqual(0);
//     });

//     it('should show all favorite movies', () => {
//       favoriteMovies.getAllMovies.mockImplementation(() => []);
//       searchMovies('    ');
//       expect(favoriteMovies.getAllMovies).toHaveBeenCalled();
//     });
//   });
// });
