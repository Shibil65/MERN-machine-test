
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookForm from "./pages/BookForm";
import BooksList from "./pages/BookList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookForm />} />
        <Route path="/books" element={<BooksList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 