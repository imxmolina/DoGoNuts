import React, { Component } from "react";
import { CreateBox } from "../../components/CreateBox";
import API from "../../utils/API";
import axios from "axios";
import {Nav} from '../../components/Nav';
import { Col, Row, Container } from "../../components/Grid";


class CreateBoxPage extends Component {
    state = {
        box: [],
        boxname: "",
        boxId: ""
    }

    checkIfAuth = () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        API.checkAuth()
            .catch(err => this.props.history.push("/login"));
    }

    componentDidMount() {
        this.checkIfAuth();
    }
    handleCreateBox = name => {
        const boxData = { boxname: name }
        API.saveBox(boxData).then(res =>
            API.getBox(res.data._id)
                .then(res =>
                    this.setState({
                        box: res.data,
                        boxname: res.data.boxname,
                        boxId: res.data._id,
                    })
                ).catch(err => console.log("returningnerror", err)),
        )
    };
    render() {
        return (
            <Container fluid>
                <Nav/>

                <CreateBox boxname={this.state.boxname} handleCreateBox={this.handleCreateBox} />
                <p>http://localhost:3000/api/box/{this.state.boxId}</p>
            </Container>  
        )
    }
}
export default CreateBoxPage;