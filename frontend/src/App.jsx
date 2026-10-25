import { useEffect, useState } from "react";
import {
  Link,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Layout from "./components/Layout.jsx";

const API_URL = "http://localhost:8000/blog/api/v1/post/";
const CATEGORY_API_URL = "http://localhost:8000/blog/api/v1/category/";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: #f6f7fb;
    color: #172033;
    font-family: "Inter", "Segoe UI", Arial, sans-serif;
  }

  button, input {
    font: inherit;
  }

  .blog-app {
    min-height: 100vh;
    direction: ltr;
  }

  .container {
    width: min(1120px, calc(100% - 40px));
    margin: 0 auto;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 22px 0;
    gap: 24px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 11px;
    color: #172033;
    font-size: 20px;
    font-weight: 800;
    text-decoration: none;
  }

  .brand-mark {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 13px;
    background: #6c5ce7;
    color: white;
    font-size: 23px;
    font-weight: 800;
  }

  .nav-links {
    display: flex;
    gap: 28px;
    align-items: center;
  }

  .nav-links a {
    color: #697386;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    transition: color 0.2s;
  }

  .nav-links a:hover {
    color: #6c5ce7;
  }

  .hero {
    position: relative;
    overflow: hidden;
    margin-top: 20px;
    padding: 72px 64px;
    border-radius: 28px;
    color: white;
    background: linear-gradient(125deg, #5143c9 0%, #7967f2 55%, #9a8bff 100%);
  }

  .hero::before,
  .hero::after {
    content: "";
    position: absolute;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 50%;
    pointer-events: none;
  }

  .hero::before {
    width: 340px;
    height: 340px;
    right: -80px;
    top: -150px;
  }

  .hero::after {
    width: 240px;
    height: 240px;
    right: 40px;
    bottom: -170px;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 650px;
  }

  .hero-eyebrow {
    display: inline-block;
    margin-bottom: 20px;
    padding: 9px 14px;
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 30px;
    background: rgba(255,255,255,0.12);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .hero h1 {
    margin: 0;
    font-size: clamp(34px, 5vw, 56px);
    line-height: 1.15;
    letter-spacing: -1.8px;
    font-weight: 800;
  }

  .hero p {
    max-width: 560px;
    margin: 22px 0 0;
    color: rgba(255,255,255,0.84);
    font-size: 16px;
    line-height: 1.9;
  }

  .section-heading {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 20px;
    margin: 54px 0 25px;
  }

  .section-heading h2 {
    margin: 0;
    font-size: 27px;
    letter-spacing: -0.7px;
  }

  .section-heading p {
    margin: 10px 0 0;
    color: #7b8497;
    font-size: 14px;
    line-height: 1.7;
  }

  .post-count {
    flex-shrink: 0;
    padding: 9px 14px;
    border: 1px solid #e8eaf2;
    border-radius: 30px;
    background: white;
    color: #6c5ce7;
    font-size: 13px;
    font-weight: 700;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 25px;
    padding-bottom: 70px;
  }

  .post-card {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-width: 0;
    border: 1px solid #eceef5;
    border-radius: 20px;
    background: white;
    transition: transform 0.25s, box-shadow 0.25s;
  }

  .post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 18px 40px rgba(31, 35, 70, 0.09);
  }

  .post-image-wrap {
    position: relative;
    overflow: hidden;
    height: 220px;
    background: #eeecff;
  }

  .post-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
  }

  .post-card:hover .post-image {
    transform: scale(1.04);
  }

  .image-placeholder {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    color: #8d82ee;
    font-size: 42px;
  }

  .category {
    position: absolute;
    top: 14px;
    left: 14px;
    max-width: calc(100% - 28px);
    overflow: hidden;
    padding: 7px 12px;
    border: 1px solid rgba(255,255,255,0.65);
    border-radius: 30px;
    background: rgba(255,255,255,0.94);
    color: #6554dc;
    font-size: 11px;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .post-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 23px;
  }

  .post-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    color: #9299a9;
    font-size: 12px;
  }

  .meta-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #b7bdca;
  }

  .post-title {
    margin: 15px 0 10px;
    color: #202940;
    font-size: 19px;
    line-height: 1.55;
    letter-spacing: -0.3px;
    overflow-wrap: anywhere;
  }

  .post-excerpt {
    display: -webkit-box;
    overflow: hidden;
    margin: 0;
    color: #788195;
    font-size: 13px;
    line-height: 1.9;
    overflow-wrap: anywhere;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-top: auto;
    padding-top: 23px;
  }

  .author {
    display: flex;
    align-items: center;
    gap: 9px;
    min-width: 0;
    color: #596276;
    font-size: 12px;
    font-weight: 600;
  }

  .author-avatar {
    display: grid;
    flex-shrink: 0;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #efedff;
    color: #6c5ce7;
    font-size: 12px;
    font-weight: 800;
  }

  .author-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .read-more {
    flex-shrink: 0;
    color: #6c5ce7;
    font-size: 12px;
    font-weight: 800;
    text-decoration: none;
  }

  .read-more:hover {
    color: #5143c9;
  }

  .state-box {
    grid-column: 1 / -1;
    padding: 65px 20px;
    border: 1px solid #eceef5;
    border-radius: 20px;
    background: white;
    text-align: center;
  }

  .state-icon {
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    margin: 0 auto 20px;
    border-radius: 20px;
    background: #efedff;
    color: #6c5ce7;
    font-size: 28px;
  }

  .state-box h3 {
    margin: 0 0 10px;
    font-size: 20px;
  }

  .state-box p {
    margin: 0 auto;
    max-width: 480px;
    color: #7b8497;
    font-size: 14px;
    line-height: 1.8;
  }

  .retry-button {
    margin-top: 20px;
    padding: 11px 20px;
    border: 0;
    border-radius: 10px;
    background: #6c5ce7;
    color: white;
    font-weight: 700;
    cursor: pointer;
  }

  .retry-button:hover {
    background: #5143c9;
  }

  .loading-indicator {
    width: 36px;
    height: 36px;
    margin: 0 auto 20px;
    border: 3px solid #e8e5ff;
    border-top-color: #6c5ce7;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .pagination-note {
    margin-top: -45px;
    padding-bottom: 55px;
    color: #9299a9;
    font-size: 12px;
    text-align: center;
  }

  .footer {
    padding: 25px 0;
    border-top: 1px solid #e9ebf2;
    color: #9299a9;
    font-size: 12px;
    text-align: center;
  }

  @media (max-width: 900px) {
    .posts-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .hero {
      padding: 55px 40px;
    }
  }

  @media (max-width: 600px) {
    .container {
      width: calc(100% - 28px);
    }

    .navbar {
      padding: 16px 0;
    }

    .brand {
      font-size: 17px;
    }

    .brand-mark {
      width: 37px;
      height: 37px;
    }

    .nav-links {
      gap: 14px;
    }

    .nav-links a {
      font-size: 12px;
    }

    .hero {
      margin-top: 10px;
      padding: 42px 25px;
      border-radius: 22px;
    }

    .hero h1 {
      letter-spacing: -1px;
    }

    .hero p {
      font-size: 14px;
    }

    .section-heading {
      align-items: start;
      margin-top: 40px;
    }

    .section-heading h2 {
      font-size: 23px;
    }

    .section-heading p {
      font-size: 12px;
    }

    .post-count {
      padding: 8px 10px;
      font-size: 11px;
    }

    .posts-grid {
      grid-template-columns: 1fr;
      gap: 20px;
      padding-bottom: 60px;
    }

    .post-image-wrap {
      height: 230px;
    }

    .post-body {
      padding: 20px;
    }
  }

  @media (max-width: 390px) {
    .nav-links {
      gap: 9px;
    }

    .nav-links a {
      font-size: 11px;
    }

    .section-heading {
      flex-direction: column;
      align-items: start;
    }
  }
  
    .filters {
    display: grid;
    grid-template-columns: minmax(220px, 2fr) repeat(3, minmax(140px, 1fr));
    gap: 12px;
    margin-bottom: 24px;
  }

  .filters input,
  .filters select {
    width: 100%;
    min-width: 0;
    padding: 12px 14px;
    border: 1px solid #e3e6ef;
    border-radius: 12px;
    background: white;
    color: #172033;
    outline: none;
  }

  .filters input:focus,
  .filters select:focus {
    border-color: #6c5ce7;
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
  }

  .filter-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 24px;
  }

  .filter-actions button,
  .pagination button {
    padding: 10px 16px;
    border: 1px solid #e3e6ef;
    border-radius: 10px;
    background: white;
    color: #5143c9;
    font-weight: 600;
    cursor: pointer;
  }

  .filter-actions button:hover,
  .pagination button:hover:not(:disabled) {
    background: #efedff;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding: 0 0 55px;
  }

  .pagination button:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  .pagination span {
    color: #697386;
    font-size: 13px;
  }

  .filter-error {
    margin: 0 0 20px;
    color: #c0392b;
    font-size: 13px;
  }

  @media (max-width: 750px) {
    .filters {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 480px) {
    .filters {
      grid-template-columns: 1fr;
    }
  }

  /* Shared navigation and filter layout */
  .navbar {
    width: 100%;
    padding: 16px 0;
    background: #ffffff;
    border-bottom: 1px solid #e9ebf2;
  }

  .navbar-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .filters {
    display: grid;
    grid-template-columns: minmax(220px, 2fr) repeat(3, minmax(140px, 1fr));
    gap: 14px;
    align-items: end;
    margin: 34px 0 24px;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
  }

  .filter-group label {
    color: #697386;
    font-size: 12px;
    font-weight: 700;
  }

  .filter-actions {
    grid-column: 1 / -1;
    display: flex;
    justify-content: flex-end;
    margin: 0;
  }

  @media (max-width: 750px) {
    .filters {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 480px) {
    .filters {
      grid-template-columns: 1fr;
    }
  }
`;

function textValue(value, fallback = "") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  if (typeof value === "object") {
    return (
      value.name ||
      value.title ||
      value.username ||
      value.email ||
      fallback
    );
  }

  return String(value);
}

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function PostCard({ post }) {
  const title = textValue(post.title, "Untitled");
  const category = textValue(post.category, "General");
  const author = textValue(post.author, "Author");
  const image = textValue(post.image);

  const description = textValue(
    post.snippet,
    "No description is available for this post."
  );

  const publishedDate =
    formatDate(post.published_date) || "Recently published";

  return (
    <article className="post-card">
      <div className="post-image-wrap">
        {image ? (
          <img
            className="post-image"
            src={image}
            alt={title}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              event.currentTarget.parentElement
                .querySelector(".image-placeholder")
                .style.display = "grid";
            }}
          />
        ) : null}

        <div
          className="image-placeholder"
          style={{ display: image ? "none" : "grid" }}
        >
          ✦
        </div>

        <span className="category">{category}</span>
      </div>

      <div className="post-body">
        <div className="post-meta">
          <span>{publishedDate}</span>
          <span className="meta-dot" />
          <span>Article</span>
        </div>

        <h3 className="post-title">{title}</h3>

        <p className="post-excerpt">{description}</p>

        <div className="post-footer">
          <div className="author">
            <span className="author-avatar">
              {author.charAt(0).toUpperCase()}
            </span>

            <span className="author-name">{author}</span>
          </div>

          <Link className="read-more" to={`/articles/${post.id}`}>
            Read article →
          </Link>
        </div>
      </div>
    </article>
  );
}


function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPost() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_URL}${id}/`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Article not found."
              : `Request failed with status ${response.status}.`
          );
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Could not load the article.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPost();

    return () => controller.abort();
  }, [id]);

  return (
    <>
      <style>{styles}</style>

      <main className="container" style={{ paddingTop: 32, paddingBottom: 60 }}>
        <Link className="read-more" to="/">
          ← Back to articles
        </Link>

        {loading ? (
          <div className="state-box" style={{ marginTop: 24 }}>
            <div className="loading-indicator" />
            <h3>Loading article</h3>
          </div>
        ) : error ? (
          <div className="state-box" style={{ marginTop: 24 }}>
            <h3>Unable to load article</h3>
            <p>{error}</p>
          </div>
        ) : post ? (
          <article style={{ maxWidth: 800, margin: "32px auto" }}>
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                style={{
                  width: "100%",
                  maxHeight: 420,
                  objectFit: "cover",
                  borderRadius: 20,
                  marginBottom: 24,
                }}
              />
            )}

            <div className="post-meta">
              <span>{formatDate(post.published_date)}</span>
              <span className="meta-dot" />
              <span>{textValue(post.category, "General")}</span>
            </div>

            <h1 style={{ fontSize: "clamp(30px, 5vw, 44px)", lineHeight: 1.3 }}>
              {post.title}
            </h1>

            <div style={{ color: "#788195", lineHeight: 2, whiteSpace: "pre-wrap" }}>
              {post.content}
            </div>
          </article>
        ) : null}
      </main>
    </>
  );
}


export default function App() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [ordering, setOrdering] = useState("-published_date");

  const [retryKey, setRetryKey] = useState(0);

  // دریافت دسته‌بندی‌ها
  useEffect(() => {
    const controller = new AbortController();

    async function fetchCategories() {
      try {
        const response = await fetch(CATEGORY_API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load categories.");
        }

        const data = await response.json();
        setCategories(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Category loading error:", err);
        }
      }
    }

    fetchCategories();

    return () => controller.abort();
  }, []);

  // تأخیر کوتاه برای جلوگیری از درخواست به‌ازای هر حرف جست‌وجو
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setCurrentPage(1);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // دریافت پست‌ها با فیلتر و صفحه‌بندی
  useEffect(() => {
    const controller = new AbortController();

    async function fetchPosts() {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      params.set("page", String(currentPage));
      params.set("ordering", ordering);

      if (search) {
        params.set("search", search);
      }

      if (category) {
        params.set("category", category);
      }

      if (author.trim()) {
        params.set("author", author.trim());
      }

      const url = `${API_URL}?${params.toString()}`;

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Request failed with status ${response.status}.`
          );
        }

        const data = await response.json();

        const results = Array.isArray(data)
          ? data
          : data.results;

        if (!Array.isArray(results)) {
          throw new Error("Invalid posts response from the API.");
        }

        setPosts(results);
        setTotal(
          typeof data.count === "number"
            ? data.count
            : results.length
        );

        setPageCount(
          typeof data["page count"] === "number"
            ? data["page count"]
            : 1
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            err.message ||
              "Could not connect to the Django API."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPosts();

    return () => controller.abort();
  }, [
    currentPage,
    search,
    category,
    author,
    ordering,
    retryKey,
  ]);

  function resetFilters() {
    setSearchInput("");
    setSearch("");
    setCategory("");
    setAuthor("");
    setOrdering("-published_date");
    setCurrentPage(1);
  }

  return (
    <>
      <style>{styles}</style>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/articles/create" element={<CreatePost />} />
          <Route path="/articles/:id" element={<PostDetail />} />

          <Route
            path="/"
            element={
              <div className="blog-app">
                <header className="hero">
                  <div className="container hero-content">
                    <span className="hero-eyebrow">THE BLOG</span>
                    <h1>Ideas worth sharing.</h1>
                    <p>
                      Discover stories, insights, and ideas from our writers.
                    </p>
                  </div>
                </header>

                <main className="container">
                  <section className="filters" aria-label="Article filters">
                    <div className="filter-group">
                      <label htmlFor="search">Search articles</label>
                      <input
                        id="search"
                        type="search"
                        placeholder="Search by title or content..."
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                      />
                    </div>

                    <div className="filter-group">
                      <label htmlFor="category">Category</label>
                      <select
                        id="category"
                        value={category}
                        onChange={(event) => {
                          setCategory(event.target.value);
                          setCurrentPage(1);
                        }}
                      >
                        <option value="">All categories</option>
                        {categories.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="filter-group">
                      <label htmlFor="author">Author ID</label>
                      <input
                        id="author"
                        type="number"
                        min="1"
                        placeholder="Author ID"
                        value={author}
                        onChange={(event) => {
                          setAuthor(event.target.value);
                          setCurrentPage(1);
                        }}
                      />
                    </div>

                    <div className="filter-group">
                      <label htmlFor="ordering">Sort by</label>
                      <select
                        id="ordering"
                        value={ordering}
                        onChange={(event) => {
                          setOrdering(event.target.value);
                          setCurrentPage(1);
                        }}
                      >
                        <option value="-published_date">Newest first</option>
                        <option value="published_date">Oldest first</option>
                      </select>
                    </div>

                    <div className="filter-actions">
                      <button type="button" onClick={resetFilters}>
                        Reset filters
                      </button>
                    </div>
                  </section>

                  {error ? (
                    <div className="state-box">
                      <h3>Unable to load articles</h3>
                      <p>{error}</p>
                      <button
                        className="retry-button"
                        type="button"
                        onClick={() => setRetryKey((key) => key + 1)}
                      >
                        Try again
                      </button>
                    </div>
                  ) : loading ? (
                    <div className="state-box">
                      <div className="loading-indicator" />
                      <h3>Loading articles</h3>
                      <p>Please wait while we fetch the latest articles.</p>
                    </div>
                  ) : posts.length === 0 ? (
                    <div className="state-box">
                      <div className="state-icon">✦</div>
                      <h3>No articles found</h3>
                      <p>Try changing your search terms or resetting the filters.</p>
                      <button className="retry-button" type="button" onClick={resetFilters}>
                        Reset filters
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="section-heading">
                        <div>
                          <h2>Latest articles</h2>
                          <p>Discover the latest stories from our writers.</p>
                        </div>
                        <span className="post-count">
                          {total} {total === 1 ? "article" : "articles"}
                        </span>
                      </div>

                      <div className="posts-grid">
                        {posts.map((post) => (
                          <PostCard key={post.id} post={post} />
                        ))}
                      </div>

                      <div className="pagination" aria-label="Article pagination">
                        <button
                          type="button"
                          disabled={currentPage <= 1 || loading}
                          onClick={() => setCurrentPage((page) => page - 1)}
                        >
                          Previous
                        </button>
                        <span>Page {currentPage} of {pageCount}</span>
                        <button
                          type="button"
                          disabled={currentPage >= pageCount || loading}
                          onClick={() => setCurrentPage((page) => page + 1)}
                        >
                          Next
                        </button>
                      </div>
                    </>
                  )}
                </main>

                <footer className="footer">
                  <div className="container">
                    <p>Blog. — Stories and ideas worth sharing.</p>
                  </div>
                </footer>
              </div>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <main className="container" style={{ paddingTop: 40 }}>
              <h1>Page not found</h1>
              <Link to="/">Back to articles</Link>
            </main>
          }
        />
      </Routes>
    </>
  );
}