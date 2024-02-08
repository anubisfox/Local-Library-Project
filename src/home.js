function getTotalBooksCount(books) {
  let total = 0;
  for (let i = 0; i < books.length; i++) {
    total++;
  }
  return total;
}

function getTotalAccountsCount(accounts) {
  let total = 0;
  accounts.forEach((account) => total++);
  return total;
}

function getBooksBorrowedCount(books) {
  let total = 0;
  const checkedOutBooks = books.filter((book) => {
    return book.borrows.some((borrow) => {
      return !borrow.returned;
    });
  });
  checkedOutBooks.forEach((book) => total++);
  return total;
}

function getMostCommonGenres(books) {
  const genreCounts = {};

  books.forEach(book => {
    if (book.genre) {
      const genres = Array.isArray(book.genre) ? book.genre : [book.genre];
      genres.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    }
  });

  const genreArray = Object.keys(genreCounts).map(name => ({
    name,
    count: genreCounts[name],
  }));

  genreArray.sort((a, b) => b.count - a.count);

  return genreArray.slice(0, 5);
}

function getMostPopularBooks(books) {
  const popularBooks = books.reduce((result, book) => {
    result.push({ name: book.title, count: book.borrows.length });
    return result;
  }, []);
  
  popularBooks.sort((a, b) => a.count < b.count ? 1 : -1);
  
  return popularBooks.slice(0, 5);
}

function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function getMostPopularAuthors(books, authors) {
  let popularAuthors = [];
  books.forEach((book) => {
    const author = findAuthorById(authors, book.authorId);
    if (author) {
      const borrowCount = book.borrows.length;
      const existingAuthor = popularAuthors.find((a) => a.name === `${author.name.first} ${author.name.last}`);
      if (existingAuthor) {
        existingAuthor.count += borrowCount;
      } else {
        popularAuthors.push({ name: `${author.name.first} ${author.name.last}`, count: borrowCount });
      }
    }
  });
  popularAuthors.sort((a, b) => b.count - a.count);

  return popularAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
