function findAuthorById(authors, id) {
  const foundAuthor = authors.find((author) => author.id === id);
  return foundAuthor;
}

function findBookById(books, id) {
  const foundBook = books.find((book) => book.id === id);
  return foundBook;
}

function partitionBooksByBorrowedStatus(books) {
  const booksReturned = books.filter((book) =>
    book.borrows.every((borrow) => borrow.returned)
  );
  const booksNotReturned = books.filter((book) => 
    book.borrows.some((borrow) => !borrow.returned)
  );
  return [booksNotReturned, booksReturned];
}

function getBorrowersForBook(book, accounts) {
  const transactions = book.borrows.slice(0, 10);

  const borrowers = transactions.map((transaction) => {
    const account = accounts.find((acc) => acc.id === transaction.id);
    return { ...account, returned: transaction.returned };
  });

  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
