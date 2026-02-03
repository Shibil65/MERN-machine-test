import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Add Book</h2>

              {success && (
                <div className="alert alert-success text-center">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Book Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="date"
                    className="form-control"
                    value={publishedDate}
                    onChange={(e) => setPublishedDate(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Add Book
                </button>
              </form>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default BookForm;
