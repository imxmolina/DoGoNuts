// eslint-disable-next-line
import React, { Component } from "react";
import { DonutChoice, DonutItem } from "../../components/donutChoice";
import { BoxContainer, BoxItems } from "../../components/boxContainer";
import { Col, Row, Container } from "../../components/Grid";
import { CreateBox } from "../../components/CreateBox";
import { SelectBox, BoxChoice } from "../../components/SelectBox";
import { BoxContent, OrderedItem } from "../../components/BoxContentList";
import { Nav } from "../../components/Nav";
// import {Link} from "react-router-dom";
import API from "../../utils/API";
import axios from "axios";

class Order extends Component {
    
    state = {
        donuts: [],
        name: "",
        donutId: "",
        image: "",
        boxId: "",
        box: [],
        boxes: [],
        boxname: "",
        donutcount: [],
    };

    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        this.loadDonuts();
        // this.loadBoxes();
    }

    loadDonuts = () => {
        //API FOR GET DONUTS
        API.getDonuts()
            .then(res =>
                this.setState({ donuts: res.data, name: "", donutId: "" })
            )
            .catch((error) => {
                if (error.response.status === 401) {
                    this.props.history.push("/login");
                }
            });
        console.log(this.state.donuts);
    };

    loadBoxes = () => {
        //API to get all boxes
        API.getAllBoxes()
            .then(res => {
                this.setState({ boxes: res.data[0], box: res.data[0], boxId: res.data[0]._id, donutcount: res.data[0].donutcount });
            }
            ).catch(err => console.log(err));
    };

    getBox = (boxId) => {
        console.log(boxId);
        API.getBox(
            boxId
        ).then(res => {
            this.setState({
                box: res.data, donutcount: res.data.donutcount
            })
        }
        ).catch(err => console.log("returningnerror", err))
    };

    renderDonutCount() {
        // eslint-disable-next-line
        if (this.state.box.donutcount == undefined) {
            return []
        } else {
            return this.state.box.donutcount.map(Picked => (
                <BoxItems key={Picked}>
                    <img className="order" src={this.state.donuts.find(x => x._id === Picked).image} />
                </BoxItems>
            ))
        }
    }


    calculateOrder() {
        if (this.state.donutcount === undefined) {
            return <p>no donuts</p>
        } else {
            // Logic to manipulate data
            let count = this.state.donutcount.reduce((res, val) => {
                if (res[val]) {
                    res[val]++;
                } else {
                    res[val] = 1;
                }
                return res;
            }, {});

            let output = Object.entries(count)
                .sort((a, b) => b[1] - a[1]) //2)
                .map(v => v[0]); //3)

            let countArray = Object.entries(count)
                .sort((a, b) => b[1] - a[1])
                .map(v => v[1]);

            let donutArray = []
            for (var i = 0; i < output.length; i++) {
                var donutCounts = { name: output[i], count: countArray[i] }
                donutArray.push(donutCounts)
            }
            // return data 

            return donutArray.map(Picked => (
                <OrderedItem key={Picked}>
                    <p key={Picked}>{this.state.donuts.find(x => x._id === Picked.name).name} {Picked.count}</p>
                </OrderedItem>

            ))


        }

    }

    handleClick = donutId => {
        const donut = this.state.donuts.find(donut => donut._id === donutId);
        const boxId = this.state.boxId
        API.populateBox(boxId, donut).then(res => this.getBox(boxId));
    };

    handleCreateBox = name => {
        const boxData = { boxname: name, donutcount: [] }
        API.saveBox(boxData).then(res =>
            API.getBox(res.data._id)
                .then(res =>
                    this.setState({
                        box: res.data,
                        boxname: res.data.boxname,
                        boxId: res.data._id,
                        donutcount: []
                    })
                ).catch(err => console.log("returningnerror", err))
        )
    };

    render() {

        return (
            <Container fluid>
                <Nav />
                <Row>
                    <Col size="md-3">
                        <h1>CHOICES</h1>
                        {this.state.donuts.length ? (
                            <DonutChoice>
                                {this.state.donuts.map(Donut => (
                                    <DonutItem key={Donut._id} handleClick={this.handleClick} donut_id={Donut._id} donut_image={Donut.image}>
                                        <div>
                                            <p>
                                                <img src={Donut.image} alt="" width="50" height="50" />
                                                {Donut.name}
                                            </p>
                                        </div>
                                    </DonutItem>
                                ))}
                            </DonutChoice>
                        ) : (
                                //placeholder image
                                <h3>No Donuts</h3>
                            )}
                    </Col>
                    <Col size="md-9 sm-12">
                        {localStorage.getItem('jwtToken') &&
                            <button className="btn btn-success" onClick={this.logout}>Logout</button>
                        }
                        <CreateBox boxname={this.state.boxname} handleCreateBox={this.handleCreateBox} />
                        {this.state.boxes.length ? (
                            <SelectBox>
                                {this.state.boxes.map(Box => (
                                    <BoxChoice key={Box._id} handleClick={this.selectBox} box_id={Box._id}>
                                        <div>
                                            <p name={Box.name}>

                                            </p>
                                        </div>
                                    </BoxChoice>
                                ))}
                            </SelectBox>
                        ) : (
                                <h3>No Boxes</h3>
                            )}
                        <BoxContainer>

                            {this.renderDonutCount()}

                        </BoxContainer>

                        <BoxContent>

                            {this.calculateOrder()}

                        </BoxContent>

                        {/* <Link to="/orderlist">
                            <ListBtn />
                        </Link> */}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Order;
