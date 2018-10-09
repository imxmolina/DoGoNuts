import React from "react";
import axios from "axios";

//////// --> NEXMO CODE <-- ////////////////////

function MakeItRain(){

    // // // // --> --> --> send a POST
    var x = window.location.href;
    var y = x.slice(-24);
    console.log(y);

    axios.post('/makeitrain', {
        boxid : y
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
// MakeItRain();
//////// --> END OF NEXMO CODE <-- ////////////////////

export const SendText = () => (
        <button onClick={MakeItRain}> Make It Rain </button>
);