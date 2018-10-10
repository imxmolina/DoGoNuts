import React, { Component } from "react";
import { CreateBox } from "../../components/CreateBox";
import { SelectBox, BoxChoice } from "../../components/SelectBox";
import API from "../../utils/API";
// import ReactModal from 'react-modal';
import axios from "axios";

class CreateBoxPage extends Component {
    state = {
        box: [],
        boxname: "",
        boxId: "",
        boxes: []
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
            <div>
                <CreateBox boxname={this.state.boxname} handleCreateBox={this.handleCreateBox} />
                <p>http://localhost:3000/api/box/{this.state.boxId}</p>
            </div>

        )
    }
}
export default CreateBoxPage;