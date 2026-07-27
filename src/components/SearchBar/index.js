import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length >= 2) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "50px",
          padding: "10px 18px",
          width: "300px",
        }}
      >
        <FaSearch color="#aaa" />

        <input
          type="text"
          placeholder="Search anime..."
          value={query}
          onChange={handleChange}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#fff",
            marginLeft: "10px",
            width: "100%",
            fontSize: "15px",
          }}
        />
      </div>
    </form>
  );
};

export default SearchBar;