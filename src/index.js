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
        };
        this.handleStartTimer = this.handleStartTimer.bind(this);
        this.handleStopTimer = this.handleStopTimer.bind(this);
        this.handleResetTimer = this.handleResetTimer.bind(this);
    }
    handleStartTimer() {
        this.setState(prevState => ({
            time: prevState.time,
            start: Date.now() - prevState.time,
            isOn: true,
        }));
        this.timer = setInterval(
            () =>
                this.setState(prevState => ({
                    time: Date.now() - prevState.start,
                })),
            1,
        );
    }

    handleStopTimer() {
        this.setState({isOn: false});
        clearInterval(this.timer);
    }

    handleResetTimer() {
        this.setState({time: 0});
    }

    render() {
        const start =
            this.state.time === 0 ? (
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
            this.state.time !== 0 && !this.state.isOn ? (
                <button type={"button"} onClick={this.handleResetTimer}>
                    {`Reset`}
                </button>
            ) : null;
        const resume =
            this.state.time !== 0 && !this.state.isOn ? (
                <button type={"button"} onClick={this.handleStartTimer}>
                    {`Resume`}
                </button>
            ) : null;
        return (
            <div>
                <Header />
                <h3>
                    {`Timer:  ${ms(this.state.time, {
                        secondsDecimalDigits: 0,
                    })}`}
                </h3>
                {start}
                {resume}
                {stop}
                {reset}
            </div>
        );
    }
}

const root = document.querySelector("#app");

ReactDOM.render(<Timer />, root);
