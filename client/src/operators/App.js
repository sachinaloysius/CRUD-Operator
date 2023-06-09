import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Create from "./Create";
import Read from "./Read";
import Delete from "./Delete";
import Update from "./Update";
import Crud from "./Crud";

export default function App() {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/Create">Create</Link>
          </li>
          <li>
            <Link to="/Read">Read</Link>
          </li>
          <li>
            <Link to="/Delete">Delete</Link>
          </li>
          <li>
            <Link to="/Update">Update</Link>
          </li>
          <li>
            <Link to="/CRUD">CRUD</Link>
          </li>
        </ul>
      </div>

      <Routes>
        <Route path="/Create" element={<Create />} />
        <Route path="/Read" element={<Read />} />
        <Route path="/Delete" element={<Delete />} />
        <Route path="/Update" element={<Update />} />
        <Route path="/Crud" element={<Crud />} />
      </Routes>
    </>
  );
}
