import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ name, icon: Icon, path }) => {
  return (
    <Link to={path} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 15px",
          marginBottom: "8px",
          cursor: "pointer",
          borderRadius: "8px",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#f0f0f0")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        <div style={{ fontSize: "20px", marginRight: "10px" }}>
          <Icon />
        </div>
        <span>{name}</span>
      </div>
    </Link>
  );
};

export default SidebarItem;
