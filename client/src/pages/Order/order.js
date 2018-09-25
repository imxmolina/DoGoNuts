import React, { Component } from "react";
import { donutChoice, donutItem } from "../../components/donutChoice";
import API from "../../utils/API";

class Order extends Component {
    state = {
        donuts: [],
        name:"",
        users: [],
    };

    componentDidMount() {
        this.loadDonuts();
    }

    loadDonuts = () => {
        //API FOR GET DONUT
        API.getDonuts()
            .then(res =>
                this.setState({ donuts: res.data, name:"" })
            )
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
            <h1>CHOICES</h1>
              {this.state.donuts.length ? (
                  <donutChoice>
                      {this.state.donuts.map(donut => (
                          <donutItem key={donut._id}>
                              <strong>{donut.name}</strong>
                          </donutItem>
                      ))}
                  </donutChoice>
              ): (
                  //placeholder image
                  <h3>No Donuts</h3>
              )}

            </div>


        )
    }
}

export default Order;


