import axios from "axios";

export default {
  // Box API Functions (C.R.U.D.)
  // ===============================================================================================

  // Saves a box to the database : C
  saveBox: function(boxData) {
    return axios.post("/api/box", boxData);
  },
  // Gets all boxes in database  : R
  getAllBoxes: function() {
    return axios.get("/api/box");
  },
  // Gets the box with the given id : R
  getBox: function(id) {
    console.log("GET BOX")
    console.log("GET BOX ID: " + id);
    return axios.get("/api/box/" + id._id);
  },
  // Updates box in database with an additional donut and it's data : U
  populateBox: function(id, donutData) {
    return axios.put("/api/box/" + id, donutData);
  },
  // Deletes the box with the given id : D
  deleteBox: function(id) {
    return axios.delete("/api/box/" + id);
  },

  // Donuts API Functions
  // ===============================================================================================

  // Gets all donuts data from the database : R
  getDonuts: function(id) {
    return axios.get("/api/donuts")
  },
  // Gets user orders from the database : R
  getOrders: function(id) {
    return axios.get("/api/orders")
  }

};