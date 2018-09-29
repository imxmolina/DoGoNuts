import React, { Component } from "react";
import { DonutChoice, DonutItem } from "../../components/donutChoice";
import { BoxContainer, BoxItems } from "../../components/boxContainer";
import { Col, Row, Container } from "../../components/Grid";
import { ListBtn } from "../../components/ListBtn";
import { CreateBox } from "../../components/CreateBox";
import {Link} from "react-router-dom";
import API from "../../utils/API";

class Order extends Component {
    state = {
        donuts: [],
        name: "",
        id: "",
        image: "",
        users: [],
        box: {},
        donutcount: [],
    };

    componentDidMount() {
        this.loadDonuts();
        this.getBox();
    }

    loadDonuts = () => {
        //API FOR GET DONUT
        API.getDonuts()
            .then(res =>
                this.setState({ donuts: res.data, name: "", id: "" })
            )
            .catch(err => console.log(err));
    };
    getBox = (id) => {
        console.log(id);
        API.getBox({
                _id: id
            
        }).then(res =>
            this.setState({
                box: res.data[0], donutcount: res.data[0]
            })
        ).catch(err => console.log("returningnerror", err))
    };

    renderDonutCount() {

        if (this.state.donutcount.donutcount == undefined) {

            return []
        } else {
            return this.state.donutcount.donutcount.map(Picked => (
                <BoxItems key={Picked}>
                    <p>{Picked}</p>
                </BoxItems>

            ))
        }
    }

    handleClick = id => {
        const donut = this.state.donuts.find(donut => donut._id === id);
        const boxId = this.state.box._id

        API.populateBox(boxId,donut).then(res => this.getBox(boxId));
    };

    render() {
        console.log(this.state.donuts);
        console.log(this.state.donutcount.donutcount);

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
                        <CreateBox/>
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