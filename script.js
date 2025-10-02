document.addEventListener('DOMContentLoaded', () => {
  // Load borrowed & history from localStorage
  let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
  let historyBooks = JSON.parse(localStorage.getItem('historyBooks')) || [];

  function saveData() {
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
    localStorage.setItem('historyBooks', JSON.stringify(historyBooks));
  }

  // --- Borrow Books (catalog.html) ---
  const borrowButtons = document.querySelectorAll('.book-card .btn:not([disabled])');
  borrowButtons.forEach(button => {
    button.addEventListener('click', function () {
      const card = this.closest('.book-card');
      const bookTitle = card.querySelector('.book-title').textContent;
      const authorElement = card.querySelector('.book-author');
      const bookAuthor = authorElement ? authorElement.textContent.replace('by ', '') : "Unknown";

      // Prevent duplicate borrowing
      if (!borrowedBooks.find(b => b.title === bookTitle)) {
        borrowedBooks.push({
          title: bookTitle,
          author: bookAuthor,
          borrowedDate: new Date().toLocaleDateString(),
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()
        });
        saveData();
        alert(`You have successfully borrowed "${bookTitle}".`);
      } else {
        alert(`You already borrowed "${bookTitle}".`);
      }
    });
  });

  // --- Display Borrowed Books (account.html) ---
  const borrowedTable = document.querySelector('#borrowed-books');
  if (borrowedTable) {
    borrowedBooks.forEach(book => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.borrowedDate}</td>
        <td>${book.dueDate}</td>
        <td><button class="btn btn-danger">Return</button></td>
      `;
      borrowedTable.appendChild(row);

      // Handle Return
      row.querySelector('.btn-danger').addEventListener('click', () => {
        borrowedBooks = borrowedBooks.filter(b => b.title !== book.title);
        historyBooks.push({
          ...book,
          returnedDate: new Date().toLocaleDateString()
        });
        saveData();
        row.remove();
        alert(`You have returned "${book.title}".`);
        location.reload(); // refresh to update history
      });
    });
  }

  // --- Display Borrowing History (account.html) ---
  const historyTable = document.querySelector('#history-books');
  if (historyTable) {
    historyBooks.forEach(book => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.borrowedDate}</td>
        <td>${book.returnedDate}</td>
      `;
      historyTable.appendChild(row);
    });
  }

  // --- Contact Form (contact.html) ---
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }

  // --- Book Search (catalog.html) ---
  const searchBox = document.querySelector('#search-box');
  if (searchBox) {
    searchBox.addEventListener('input', function () {
      const query = this.value.toLowerCase();
      const books = document.querySelectorAll('.book-card');
      books.forEach(book => {
        const title = book.querySelector('.book-title').textContent.toLowerCase();
        const author = book.querySelector('.book-author')
          ? book.querySelector('.book-author').textContent.toLowerCase()
          : "";
        const subject = book.querySelector('.book-subject')
          ? book.querySelector('.book-subject').textContent.toLowerCase()
          : "";

        if (title.includes(query) || author.includes(query) || subject.includes(query)) {
          book.style.display = "";
        } else {
          book.style.display = "none";
        }
      });
    });
  }
});
