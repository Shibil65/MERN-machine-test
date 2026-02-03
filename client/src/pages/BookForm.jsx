import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BookForm.css"; 

function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, publishedDate }),
    });

    setSuccess("Book added successfully ✅");

    setTimeout(() => {
      navigate("/books");
    }, 1000);
  };

  return (
    <div className="bookform-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-lg p-4 rounded-4 border-0 w-100" style={{ maxWidth: "450px" }}>
        <h2 className="text-center mb-4 text-gradient">Add New Book</h2>

        {success && (
          <div className="alert alert-success text-center py-2 success-msg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control input-custom"
              id="titleInput"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label htmlFor="titleInput">Book Title</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control input-custom"
              id="authorInput"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <label htmlFor="authorInput">Author</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="date"
              className="form-control input-custom"
              id="dateInput"
              placeholder="Published Date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              required
            />
            <label htmlFor="dateInput">Published Date</label>
          </div>

          <button type="submit" className="btn btn-gradient w-100 btn-lg">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookForm;
