
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api.js";
const API_URL = "http://localhost:8000/blog/api/v1";

export default function CreatePost() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [publishedDate, setPublishedDate] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${API_URL}/category/`);

        if (!response.ok) {
          throw new Error("Failed to load categories.");
        }

        const data = await response.json();
        setCategories(data.results ?? data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchCategories();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!category) {
      setError("Please select a category.");
      return;
    }

    const selectedCategory = categories.find(
      (item) => String(item.id) === category
    );

    if (!selectedCategory) {
      setError("The selected category is invalid.");
      return;
    }

    setLoading(true);

    try {
      const response = await apiFetch(`${API_URL}/post/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        category: selectedCategory.name,
        status,
        published_date: new Date(publishedDate).toISOString(),
      }),
    });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        throw new Error(
          "Your session has expired. Please log in again."
        );
      }

      if (!response.ok) {
        throw new Error(
          JSON.stringify(data) || "Failed to create the article."
        );
      }

      navigate(`/articles/${data.id}`);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1>Create New Article</h1>
      <p>Share your ideas with the world.</p>

      {error && (
        <p
          role="alert"
          style={{ color: "crimson", overflowWrap: "anywhere" }}
        >
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "20px",
          maxWidth: "650px",
        }}
      >
        <label>
          Article Title
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter article title"
            required
            maxLength={250}
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          Article Content
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write your article here..."
            required
            rows={10}
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />
        </label>

        <label>
          Publication Date
          <input
            type="datetime-local"
            value={publishedDate}
            onChange={(event) => setPublishedDate(event.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          >
            <option value="">Select a category</option>

            {categories.map((item) => (
              <option key={item.id} value={String(item.id)}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <input
            type="checkbox"
            checked={status}
            onChange={(event) => setStatus(event.target.checked)}
          />
          Publish Article
        </label>

        <div style={{ display: "flex", gap: "12px" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Article"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
