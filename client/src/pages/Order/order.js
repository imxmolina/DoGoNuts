import React, { Component } from "react";
import { DonutChoice, DonutItem } from "../../components/donutChoice";
import { BoxContainer, BoxItems } from "../../components/boxContainer";
import { Col, Row, Container } from "../../components/Grid";
import { ListBtn } from "../../components/ListBtn";
import { CreateBox } from "../../components/CreateBox";
import { SelectBox } from "../../components/SelectBox";
import { Link } from "react-router-dom";
import API from "../../utils/API";

class Order extends Component {
    state = {
        donuts: [],
        name: "",
        donutId: "",
        boxId: "",
        image: "",
        boxes: [],
        box: [],
        boxname: "",
        donutcount: [],
    };

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

            this.setState({ boxes: res.data, box: res.data[0], boxId: res.data[0]._id, donutcount: res.data[0].donutcount });
        }
            )
            .catch(err => console.log(err)
            );
    };

    getBox = (boxId) => {
        API.getBox({
            
            _id: boxId
        }).then(res => {
            this.setState({
                box: res.data , donutcount: res.data.donutcount, boxId: res.data._id
            })
        }
        ).catch(err => console.log("returningnerror", err))
    };

    renderDonutCount() {
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
        API.populateBox(boxId, donut).then(res => this.getBox(res.data._id));
    };

    handleCreateBox = name => {
        const boxData = {boxname: name, donutcount: []}
        API.saveBox(boxData).then(res =>
            API.getBox(res.data._id)
            .then(res =>
                this.setState({
                    box: res.data[res.data.length - 1],
                    boxname: res.data[res.data.length - 1].boxname,
                    boxId: res.data[res.data.length - 1]._id,
                    donutcount: []
                })
            ).catch(err => console.log("returningnerror", err))
        )
        // this.renderDonutCount();
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
                        <SelectBox>
                            {this.state.boxes}
                        </SelectBox>
                        <BoxContainer>

                            {this.renderDonutCount()}

                        </BoxContainer>
                        <Link to="/orderlist">
                            <ListBtn />
                        </Link>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Order;