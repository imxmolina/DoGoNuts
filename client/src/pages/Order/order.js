// eslint-disable-next-line
import React, { Component } from "react";
import { DonutChoice, DonutItem } from "../../components/donutChoice";
import { BoxContainer, BoxItems } from "../../components/boxContainer";
import { Col, Row, Container } from "../../components/Grid";
import { BoxContent, OrderedItem } from "../../components/BoxContentList";
import { Nav } from "../../components/Nav";
// import {Link} from "react-router-dom";
import API from "../../utils/API";
import "./order.css"
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
        this.props.history.push("/login");
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        document.body.classList.add("background-white");
        this.loadDonuts();
        this.getBox(this.props.match.params.id);
        // this.loadBoxes();
    }
    
    componentWillUnmount() {
        document.body.classList.remove("background-white");
    }

    loadDonuts = () => {
        //API FOR GET DONUTS
        API.getDonuts()
            .then(res =>
                this.setState({ donuts: res.data, name: "", donutId: "" })
            )
            .catch(err => console.log(err));
    };
    // loadBoxes = () => {
    //     //API to get all boxes
    //     API.getAllBoxes()
    //         .then(res => 

    //             {
    //                 console.log("ALL BOXES   ",res.data);

    //             this.setState({ boxes: res.data[0], box: res.data[0], boxId: res.data[0]._id, donutcount: res.data[0].donutcount });
    //             }
    //         )
    //         .catch(err => console.log(err)
    //         );
    // };
    getBox = boxId => {
        API.getBox(
            boxId
        ).then(res => {
            this.setState({
                box: res.data, donutcount: res.data.donutcount, boxId: this.props.match.params.id, boxname: res.data.boxname
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
            console.log("ANDY!!! ", donutBoxList);
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
                ).catch(err => console.log("returningnerror", err))
        )
    };
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        }
        return (
            <Container fluid>
                <Nav />
                {localStorage.getItem('jwtToken') &&
                <button class="btn btn-primary" onClick={this.logout}>Logout</button>
              }

                <Row>
                    <Col size="md-3">
                        <div className="donutTitle"><h4>DOUGHNUTS</h4></div>
                        {this.state.donuts.length ? (
                            <DonutChoice>
                                {this.state.donuts.map(Donut => (
                                    <DonutItem key={Donut._id} handleClick={this.handleClick} donut_id={Donut._id} donut_image={Donut.image}>
                                        <div class="row">
                                        <div class="col-3">
                                        <img src={Donut.image} alt="" width="70" height="70" />
                                        </div>
                                        <div class="col-8 donutnamediv"> 
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
                    <h3 className="BoxTitle">{this.state.boxname}</h3>
                        {
                            <div>
                                {/* <Slider {...settings}> */}
                                    {this.renderDonutCount()}
                                {/* </Slider> */}
                            </div>
                        }
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
