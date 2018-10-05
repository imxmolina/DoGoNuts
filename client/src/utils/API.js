import axios from "axios";

export default {
  // Box API Functions (C.R.U.D.)
  // ===============================================================================================

  // Saves a box to the database : C
  saveBox: function(boxData) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return axios.post("/api/box", boxData);
  },
  // Gets all boxes in database  : R
  getAllBoxes: function() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return axios.get("/api/box")
  },
  // Gets the box with the given id : R
  getBox: function(id) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    console.log("GET BOX in API.js")
    console.log("GET BOX ID: " + id);
    return axios.get("/api/box/" + id);
  },
  // Updates box in database with an additional donut and it's data : U
  populateBox: function(id, donutData) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return axios.put("/api/box/" + id, donutData);
  },
  // Deletes the box with the given id : D
  deleteBox: function(id) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return axios.delete("/api/box/" + id);
  },

  // Donuts API Functions
  // ===============================================================================================

  // Gets all donuts data from the database : R
  
  getDonuts: function(id) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return axios.get("/api/donuts")
  },
  // Gets user orders from the database : R
  getOrders: function(id) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return axios.get("/api/orders")
  }

};