import React from "react";
import ms from "pretty-ms";
import ReactDOM from "react-dom";
import Header from "./components/header";
import "./scss/index.scss";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            start: 0,
            isOn: false,
            hasStart: false,
        };
        this.handleStartTimer = this.handleStartTimer.bind(this);
        this.handleStopTimer = this.handleStopTimer.bind(this);
        this.handleResetTimer = this.handleResetTimer.bind(this);
        this.handleAddTimer = this.handleAddTimer.bind(this);
        this.handleSubTimer = this.handleSubTimer.bind(this);
    }
    handleStartTimer() {
        console.log(this.state.time);
        this.setState(prevState => ({
            time: prevState.time,
            start: Date.now() - prevState.time,
            isOn: true,
            hasStart: true,
        }));
        this.timer = setInterval(
            () =>
                this.setState(prevState => ({
                    time: Date.now() - prevState.start,
                })),
            1000,
        );
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
            time: prevState.time - 60 * 1000,
        }));
    }

    handleSubTimer() {
        this.setState(prevState => ({
            time: prevState.time + 60 * 1000,
        }));
    }

    render() {
        const start =
            this.state.time === 0 || !this.state.hasStart ? (
                <button type={"button"} onClick={this.handleStartTimer}>
                    {`Start`}
                </button>
            ) : null;
        const stop = this.state.isOn ? (
            <button type={"button"} onClick={this.handleStopTimer}>
                {`Stop`}
            </button>
        ) : null;
        const reset =
            this.state.time !== 0 && !this.state.isOn && this.state.hasStart ? (
                <button type={"button"} onClick={this.handleResetTimer}>
                    {`Reset`}
                </button>
            ) : null;
        const resume =
            this.state.time !== 0 && !this.state.isOn && this.state.hasStart ? (
                <button type={"button"} onClick={this.handleStartTimer}>
                    {`Resume`}
                </button>
            ) : null;
        const addMinute =
            !this.state.isOn && !this.state.hasStart ? (
                <button type={"button"} onClick={this.handleAddTimer}>
                    {`+`}
                </button>
            ) : null;
        const subMinute =
            !this.state.isOn && !this.state.hasStart ? (
                <button type={"button"} onClick={this.handleSubTimer}>
                    {`-`}
                </button>
            ) : null;
        return (
            <div>
                <Header />
                <h3>{`${ms(10 * 60 * 1000 - this.state.time)}`}</h3>
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
