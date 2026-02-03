import { useEffect, useState } from "react";
import "./BookList.css";

function BooksList() {
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    author: "",
    publishedDate: "",
  });

  const fetchBooks = async () => {
    const res = await fetch("http://localhost:5000/api/books");
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleUpdate = async (id) => {
    await fetch(`http://localhost:5000/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    setEditingId(null); 
    fetchBooks();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/books/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      fetchBooks();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bookslist-container min-vh-100 py-5">
      <h2 className="text-center mb-5 text-gradient">Books List</h2>

      {books.length === 0 && (
        <p className="text-center text-muted">No books available</p>
      )}

      <div className="row">
        {books.map((book) => (
          <div key={book._id} className="col-md-4 mb-4">
            <div className="card shadow-lg rounded-4 hover-card h-100 p-3">
              {editingId === book._id ? (
                <>
                  <input
                    className="form-control mb-2 input-custom"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                  <input
                    className="form-control mb-2 input-custom"
                    value={editData.author}
                    onChange={(e) => setEditData({ ...editData, author: e.target.value })}
                  />
                  <input
                    type="date"
                    className="form-control mb-3 input-custom"
                    value={editData.publishedDate}
                    onChange={(e) => setEditData({ ...editData, publishedDate: e.target.value })}
                  />
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-gradient btn-sm" onClick={() => handleUpdate(book._id)}>
                      Save
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h5 className="mb-2">{book.title}</h5>
                  <p className="mb-1"><strong>Author:</strong> {book.author}</p>
                  <p className="mb-3">
                    <strong>Published:</strong>{" "}
                    {book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : "N/A"}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => {
                        setEditingId(book._id);
                        setEditData({
                          title: book.title,
                          author: book.author,
                          publishedDate: book.publishedDate ? book.publishedDate.slice(0, 10) : "",
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book._id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksList;
