// eslint-disable-next-line
//Heroku Version
import React, { Component } from "react";
import { DonutChoice, DonutItem } from "../../components/donutChoice";
import { BoxContainer, BoxItems } from "../../components/boxContainer";
import { Col, Row, Container } from "../../components/Grid";
import { BoxContent, OrderedItem } from "../../components/BoxContentList";
import API from "../../utils/API";
import axios from "axios";
import Carousel from 'nuka-carousel';
import { SendText } from "../../components/SendText";
import "./order.css";

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
        this.props.history.push("/login");
    }

    componentDidMount() {
        document.body.classList.add("background-white");
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        this.loadDonuts();
        this.getBox(this.props.match.params.id);
    }

    loadDonuts = () => {
        //API FOR GET DONUTS
        API.getDonuts()
            .then(res =>
                this.setState({ donuts: res.data, name: "", donutId: "" })
            )
            .catch(err => console.log(err));
    };

    getBox = boxId => {
        API.getBox(
            boxId
        ).then(res => {
            this.setState({
                box: res.data, donutcount: res.data.donutcount, boxId: this.props.match.params.id, boxname:res.data.boxname
            })
        }
        ).catch(err => console.log("returning error", err))
    };

    renderDonutCount() {
        // eslint-disable-next-line
        if (this.state.donutcount == undefined) {
            return []
        } else {
            let boxNumber = Math.ceil(this.state.donutcount.length / 12);
            let donutBoxList = [];

            for (let i = 0; i < boxNumber; i++) {
                let donutPart = this.state.donutcount.slice((i * 12), (i + 1) * 12);
                donutBoxList.push(donutPart);
            }
            return donutBoxList.map(Picked => (
                <div>
                    <BoxContainer>
                        {Picked.map(donutList => (
                            <BoxItems key={"IWorkSuckers"} removeDonut={this.removeDonut} donut_id={donutList}>
                                <img className="order" alt="Donut" src={this.state.donuts.find(x => x._id === donutList).image} />
                            </BoxItems>
                        ))}
                    </BoxContainer>
                </div>
            ))
        }
    }
    removeDonut = DonutId => {
        const boxId = this.props.match.params.id
        API.deleteDonut(boxId, DonutId).then(res => this.getBox(boxId));
    };
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
                ).catch(err => console.log("returning error", err))
        )
    };
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-3">
                        {/* Logout button */}
                        {
                            localStorage.getItem('jwtToken') &&
                            <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                        }
                        {/* Box Menu */}
                        <div className="donutTitle"><h4>DOUGHNUTS</h4></div>
                        {this.state.donuts.length ? (
                            <DonutChoice>
                                {this.state.donuts.map(Donut => (
                                    <DonutItem key={Donut._id} handleClick={this.handleClick} donut_id={Donut._id} donut_image={Donut.image}>
                                        <div className="row">
                                            <div className="col-3">
                                                <img src={Donut.image} alt="" width="70" height="70" />
                                            </div>
                                            <div className="col-8 donutnamediv">
                                                {Donut.name}
                                            </div>
                                        </div>
                                    </DonutItem>
                                ))}
                            </DonutChoice>
                        ) : (
                                //placeholder image
                                <h3>{this.state.boxname}</h3>
                            )}
                    </Col>
                    <Col size="md-9 sm-12">
                        {/* //creates boxes and slider */}
                        <div className="BoxTitle"><h3>{this.state.boxname}</h3></div>
                        {this.state.donutcount.length === 0 ? (
                            <BoxContainer>
                                <div>
                                    <h1>Order up!</h1>
                                </div>
                            </BoxContainer>
                        ) : (
                                this.state.donutcount.length > 12 ? (
                                    <Carousel>
                                        {this.renderDonutCount()}
                                    </Carousel>
                                ) : (
                                        this.renderDonutCount()
                                    )
                            )
                        }
                        {/* claculate numbers */}
                        <BoxContent>
                            {this.calculateOrder()}
                        </BoxContent>
                        <SendText></SendText>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Order;
