import React, { Component } from "react";
import { CreateBox } from "../../components/CreateBox";
import API from "../../utils/API";
import axios from "axios";
import { Col, Row, Container } from "../../components/Grid";
import ReactModal from 'react-modal';
import "./CreateBoxPage.css";

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
                ).catch(err => console.log("returning error", err)),
        )
    };
    constructor() {
        super();
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }
    render() {
        return (
            <Container fluid>
                <div>
                    <button onClick={this.handleOpenModal}>
                        <img src="./assets/images/createBox.png" alt="" width="200em" height="200em" />
                    </button>
                    <ReactModal
                        isOpen={this.state.showModal}
                        contentLabel="Minimal Modal Example"
                    >
                        {/* Where the order magic happens */}
                        <CreateBox boxname={this.state.boxname} handleCreateBox={this.handleCreateBox} />
                        <p>
                            <a className="nav-link" href={"https://blooming-springs-24465.herokuapp.com/" + this.state.boxId}>
                                Go to My Box: https://blooming-springs-24465.herokuapp.com/box/{this.state.boxId}
                                <span class="sr-only">(current)</span>
                            </a>
                        </p>
                        <button onClick={this.handleCloseModal}>Cancel</button>
                    </ReactModal>
                </div>
            </Container>
        )
    }
}
export default CreateBoxPage;