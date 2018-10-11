import React from "react";
import axios from "axios";
import "./sendtext.css";
//////// --> NEXMO CODE <-- ////////////////////

function MakeItRain1() {

  // // // // --> --> --> send a POST
  var x = window.location.href;
  var y = x.slice(-24);
  console.log(y);

  axios.post('/makeitrain', {
    boxid: y
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//////// --> END OF NEXMO CODE <-- ////////////////////

export const SendText = () => (
  <button className="btn text" onClick={MakeItRain1}>
    <img className="point" alt="" src="../assets/images/ordernow.png"/>
    Order!
  </button>
); 