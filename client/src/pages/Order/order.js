// eslint-disable-next-line
import React, { Component } from "react";
import { DonutChoice, DonutItem } from "../../components/donutChoice";
import { BoxContainer, BoxItems } from "../../components/boxContainer";
import { Col, Row, Container } from "../../components/Grid";
import { CreateBox } from "../../components/CreateBox";
import { SelectBox, BoxChoice } from "../../components/SelectBox";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import axios from 'axios';


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
        this.loadDonuts();
        this.loadBoxes();
    }

    loadDonuts = () => {
        //API FOR GET DONUT
        API.getDonuts()
            .then(res =>
                this.setState({ donuts: res.data, name: "" })
            )
            .catch(err => console.log(err));
    };

    loadBoxes = () => {
        //API to get all boxes
        API.getAllBoxes()
            .then(res => {
                this.setState({ boxes: res.data[0], box: res.data[0], boxId: res.data[0]._id, donutcount: res.data[0].donutcount });
            }
            )
            .catch(err => console.log(err)
            );
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
                    <p>{Picked}</p>
                </BoxItems>
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
        // console.log("This.state.donuts: " + this.state.donuts);
        // console.log("This.state.donutcount.donutcount: " + this.state.donutcount.donutcount);

        return (
            <Container fluid>

                <Row>
                    <Col size="md-3">
                        <h1>CHOICES</h1>
                        {this.state.donuts.length ? (
                            <DonutChoice>
                                {this.state.donuts.map(Donut => (
                                    <DonutItem key={Donut._id} handleClick={this.handleClick} donut_id={Donut._id} donut_image={Donut.image}>
                                        <div>
                                            <p>
                                                <img src={Donut.image} alt={Donut.name} width="50" height="50" />
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
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Order;