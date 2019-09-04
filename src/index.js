import React from "react";
import ms from "pretty-ms";
import ReactDOM from "react-dom";
import Header from "./components/header";
import Button from "./components/button";
import Modal from "./components/modal";
import "./scss/index.scss";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            start: 0,
            isOn: false,
            hasStart: false,
            timeSet: 1000 * 60,
            show: false,
        };
        this.StartTimer = this.handleStartTimer.bind(this);
        this.StopTimer = this.handleStopTimer.bind(this);
        this.ResetTimer = this.handleResetTimer.bind(this);
        this.AddTimer = this.handleAddTimer.bind(this);
        this.SubTimer = this.handleSubTimer.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleHideModal = this.hideModal.bind(this);
        this.handleCloseAndStartNew = this.closeAndStartNew.bind(this);
    }

    showModal() {
        this.setState({show: true});
    }

    hideModal() {
        this.setState({show: false});
    }

    closeAndStartNew() {
        this.setState({show: false});
        this.handleStartTimer();
    }

    handleStartTimer() {
        this.setState(prevState => ({
            time: prevState.time,
            start: Date.now() - prevState.time,
            isOn: true,
            hasStart: true,
        }));

        this.timer = setInterval(() => {
            if (this.state.time >= this.state.timeSet) {
                clearInterval(this.timer);
                this.setState({
                    time: 0,
                    isOn: false,
                    hasStart: false,
                });
                this.showModal();
            } else {
                this.setState(prevState => ({
                    time: Date.now() - prevState.start,
                }));
            }
        }, 1000);
    }

    handleStopTimer() {
        this.setState({isOn: false});
        clearInterval(this.timer);
    }

    handleResetTimer() {
        this.setState({
            time: 0,
            hasStart: false,
        });
    }

    handleAddTimer() {
        this.setState(prevState => ({
            timeSet: prevState.timeSet + 60 * 1000,
        }));
    }

    handleSubTimer() {
        this.setState(prevState => ({
            timeSet: prevState.timeSet - 60 * 1000,
        }));
    }

    render() {
        const start =
            this.state.time === 0 || !this.state.hasStart ? (
                <Button value={"Start"} handleFunc={this.StartTimer} />
            ) : null;
        const stop = this.state.isOn ? (
            <Button value={"Stop"} handleFunc={this.StopTimer} />
        ) : null;
        const reset =
            this.state.time !== 0 && !this.state.isOn && this.state.hasStart ? (
                <Button value={"Reset"} handleFunc={this.ResetTimer} />
            ) : null;
        const resume =
            this.state.time !== 0 && !this.state.isOn && this.state.hasStart ? (
                <Button value={"Resume"} handleFunc={this.StartTimer} />
            ) : null;
        const addMinute =
            !this.state.isOn && !this.state.hasStart ? (
                <Button value={" + "} handleFunc={this.AddTimer} />
            ) : null;
        const subMinute =
            !this.state.isOn && !this.state.hasStart ? (
                <Button value={" - "} handleFunc={this.SubTimer} />
            ) : null;
        return (
            <div>
                <Header />
                <Modal
                    show={this.state.show}
                    onClose={this.handleHideModal}
                    onNew={this.handleCloseAndStartNew}>
                    <p> {"et C'est..."}</p>
                    <h1>{"L'heure de la PAUSE"}</h1>
                </Modal>
                <h3>{`${ms(this.state.timeSet - this.state.time)}`}</h3>
                {addMinute}
                {start}
                {resume}
                {subMinute}
                {stop}
                {reset}
            </div>
        );
    }
}

const root = document.querySelector("#app");

ReactDOM.render(<Timer />, root);
