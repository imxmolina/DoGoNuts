import React, { Component } from "react";
import { DonutChoice, DonutItem } from "../../components/donutChoice";
import API from "../../utils/API";

class Order extends Component {
    state = {
        donuts: [],
        name: "",
        id:"5bac50a33581942e3d5e08a0",
        image: "",
        users: [],
        box: ""
    };

    componentDidMount() {
        this.loadDonuts();
    }

    loadDonuts = () => {
        //API FOR GET DONUT
        API.getDonuts()
            .then(res =>
                this.setState({ donuts: res.data, name: "", id: ""})
            )
            .catch(err => console.log(err));
    };
    getBox = () => {
        console.log('test');
        API.getBox({
            where: {
            _id: "5bac50a33581942e3d5e08a0"
        }
        }).then(res=>
            this.setState({
                box: res.data
            })
            ).catch(err => console.log(err))
    };

    
    handleClick = id => {
        const donut = this.state.donuts.find(donut => donut._id === id);
        API.populateBox(donut).then(res => this.getBox());
    };

    render() {
        console.log(this.state.donuts);
        
        return (
            <div>
                <h1>CHOICES</h1>
                {this.state.donuts.length ? (
                    <DonutChoice>
                        {this.state.donuts.map(Donut => (
                            <DonutItem key={Donut._id} handleClick={this.handleClick} donut_id={Donut._id}>
                                <div> 
                                <li>
                                    <img src={Donut.image} alt={Donut.name} width="50" height="50" />
                                    {Donut.name}
                                </li>
                                </div>
                            </DonutItem>
                        ))}
                    </DonutChoice>
                ) : (
                        //placeholder image
                        <h3>No Donuts</h3>
                    )}

            </div>


        )
    }
}

export default Order;


