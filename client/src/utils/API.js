import axios from "axios";

export default {
  // Gets all boxes
  getBoxes: function() {
    return axios.get("/api/box");
  },
  // Gets the box with the given id
  getBox: function(id) {
    return axios.get("/api/box/" + id);
  },
  // Deletes the book with the given id
  deleteBox: function(id) {
    return axios.delete("/api/box/" + id);
  },
  // Saves a book to the database
  saveBox: function(boxData) {
    return axios.post("/api/box", );
  }
};