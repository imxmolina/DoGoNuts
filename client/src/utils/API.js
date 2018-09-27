import axios from "axios";

export default {
  // Gets the box with the given id
  getBox: function(id) {
    return axios.get("/api/box/" + id);
  },
  // Deletes the box with the given id
  deleteBox: function(id) {
    return axios.delete("/api/box/" + id);
  },
  // Saves a box to the database
  saveBox: function(boxData) {
    return axios.post("/api/box", );
  },
  getDonuts: function(id) {
    return axios.get("/api/donuts")
  },
  getOrders: function(id) {
    return axios.get("/api/orders")
  }

};