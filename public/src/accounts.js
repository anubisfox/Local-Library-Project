function findAccountById(accounts, id) {
  const accountId = accounts.find((account) => account.id === id);
  return accountId;
}

function sortAccountsByLastName(accounts) {
  const sorted = accounts.sort((accountOne, accountTwo) => accountOne.name.last > accountTwo.name.last ? 1 : -1);
  return sorted;
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  books.forEach(book => {
    const borrowed = book.borrows.filter(borrow => borrow.id === account.id);
    total += borrowed.length;
  });
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  const checkedOutBooks = books.filter((book) => {
    return book.borrows.some((borrow) => {
      return borrow.id === account.id && !borrow.returned;
    });
  });
  const result = checkedOutBooks.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return {...book, author };
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
