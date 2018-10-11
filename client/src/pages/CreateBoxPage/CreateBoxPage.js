import React, { Component } from "react";
import { CreateBox } from "../../components/CreateBox";
import API from "../../utils/API";
import { Container } from "../../components/Grid";
import axios from "axios";
import "./CreateBoxPage.css"

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

    render() {
        return (
            <Container fluid>
                <div>
                    <CreateBox boxname={this.state.boxname} handleCreateBox={this.handleCreateBox} />

                    <a className="nav-link" href={"https://blooming-springs-24465.herokuapp.com/box/" + this.state.boxId}>
                        Go to My Box: https://blooming-springs-24465.herokuapp.com/box/{this.state.boxId}
                        <span className="sr-only">(current)</span>
                    </a>

                    

                </div>
            </Container>
        )
    }
}
export default CreateBoxPage;