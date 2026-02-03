import { useEffect, useState } from "react";

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
      const res = await fetch(
        `http://localhost:5000/api/books/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Delete failed");

      fetchBooks();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Books List</h2>

      {books.length === 0 && (
        <p className="text-center text-muted">No books available</p>
      )}

      <div className="row">
        {books.map((book) => (
          <div key={book._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                {editingId === book._id ? (
                  <>
                    <input
                      className="form-control mb-2"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                    />

                    <input
                      className="form-control mb-2"
                      value={editData.author}
                      onChange={(e) =>
                        setEditData({ ...editData, author: e.target.value })
                      }
                    />

                    <input
                      type="date"
                      className="form-control mb-2"
                      value={editData.publishedDate}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          publishedDate: e.target.value,
                        })
                      }
                    />

                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleUpdate(book._id)}
                    >
                      Save
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h5>{book.title}</h5>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p>
                      <strong>Published:</strong>{" "}
                      {book.publishedDate
                        ? new Date(book.publishedDate).toLocaleDateString()
                        : "N/A"}
                    </p>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => {
                        setEditingId(book._id);
                        setEditData({
                          title: book.title,
                          author: book.author,
                          publishedDate: book.publishedDate
                            ? book.publishedDate.slice(0, 10)
                            : "",
                        });
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(book._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksList;
