import axios from "axios";

export default {
  // Gets the box with the given id
  getBox: function(id) {
    return axios.get("/api/box", {id});
  },
  // Deletes the box with the given id
  deleteBox: function(id) {
    return axios.delete("/api/box/" + id);
  },
  // Gets all boxes in database
  getAllBoxes: function() {
    return axios.get("/api/box");
  },
  // Saves a box to the database
  saveBox: function(boxData) {
    return axios.post("/api/box", boxData);
  },
  // Updates box in database with an additional donut and it's data
  populateBox: function(id, donutData) {
    console.log(id);
    return axios.put("/api/box/" + id, donutData);
  },
  // Gets all donuts data in the database
  getDonuts: function(id) {
    return axios.get("/api/donuts")
  },
  getOrders: function(id) {
    return axios.get("/api/orders")
  }

};