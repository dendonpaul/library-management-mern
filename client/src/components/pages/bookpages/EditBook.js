import React from "react";
import Header from "../../pagecomps/Header";

const EditBook = () => {
  //useState constants

  return (
    <>
      <Header />
      <div className="contents_container">
        <form className="input_form" onSubmit={handleSubmission} id="addbook">
          <h1>Edit book</h1>
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="Enter Book Name"
            value={values.name}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            id="author"
            name="author"
            placeholder="Enter Author Name"
            value={values.author}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            id="description"
            name="description"
            placeholder="Enter Description"
            value={values.description}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            id="isbn"
            name="isbn"
            placeholder="Enter ISBN"
            value={values.isbn}
            onChange={handleChange}
          />
          <select
            required
            id="cat"
            name="cat"
            value={values.cat}
            onChange={handleChange}
          >
            {displayCats}
          </select>

          <input
            required
            type="number"
            id="copies"
            name="copies"
            placeholder="Enter Qty"
            value={values.copies}
            onChange={handleChange}
          />
          <button type="submit">Save Book</button>
          <span id="message_s">{messages}</span>
        </form>
      </div>
    </>
  );
};

export default EditBook;
