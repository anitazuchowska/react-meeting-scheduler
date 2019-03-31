import React, { Component } from 'react';
import { connect } from 'react-redux';

import RemindersList from './Reminders';

import { addReminder, deleteReminder, filterReminder, clearReminders } from '../actions';
import { momentToDate, momentNow } from '../utilities/helpers'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true
        };
        this.addCheckActive = this.addCheckActive.bind(this);
    }

    componentDidMount () {
        this.taskInput.focus();
    }

    addReminder (e) {
        const timeInputStartVal = momentToDate(this.timeInputStartVal.value);
        const timeInputEndVal = momentToDate(this.timeInputEndVal.value);

        if (e.type === 'submit') e.preventDefault();

        this.props.addReminder(
            this.taskInput.value,
            timeInputStartVal,
            timeInputEndVal,
            this.textarea.value,
        );
        this.taskInput.value = '';
        this.textarea.value = '';
        this.setState({ disabled: true });
    }

    filterReminder(e) {
        const filterInputStartVal = momentToDate(this.filterInputStartVal.value);
        const filterInputEndVal = momentToDate(this.filterInputEndVal.value);

        this.props.filterReminder(
            filterInputStartVal,
            filterInputEndVal
        );
    }

    deleteReminder (id) {
        this.props.deleteReminder(id);
    }

    clearReminders (e) {
        this.props.clearReminders(e);
    }

    addCheckActive() {
        const newValue = this.taskInput.value;

        (newValue && this.state.disabled) ? this.setState({ disabled: false }) : this.setState({ disabled: true });
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">
                    <h2>Meeting scheduler</h2>
                </div>
                <section className="container">
                    <div className="row form-container">
                        <div className="form reminder-form">
                            <div className="form-group">
                                <label htmlFor="meetingTitle">Title of the meeting *</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="meetingTitle"
                                    placeholder="Enter title of the meeting here..."
                                    ref={(el) => { this.taskInput = el; }}
                                    onChange={this.addCheckActive}
                                />
                                <label htmlFor="timeInputStartVal">
                                    Date of the beginning of the meeting
                                </label>
                                <input
                                    className="form-control"
                                    type="datetime"
                                    id="timeInputStartVal"
                                    defaultValue={momentNow()}
                                    ref={(el) => { this.timeInputStartVal = el; }}
                                />
                                <label htmlFor="timeInputEndVal">
                                    The end date of the meeting
                                </label>
                                <input
                                    className="form-control"
                                    type="datetime"
                                    id="timeInputEndVal"
                                    defaultValue={momentNow()}
                                    ref={(el) => { this.timeInputEndVal = el; }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="meeting-info">
                                    Description of the meeting
                                </label>
                                <textarea
                                    name="meeting-info"
                                    className="form-control"
                                    id="meeting-info"
                                    cols="30"
                                    rows="10"
                                    defaultValue="Enter the description of the meeting here..."
                                    ref={(el) => { this.textarea = el; }}></textarea>
                            </div>
                            <div className="form-group">
                                <button
                                    className="btn btn-success"
                                    type="button"
                                    onClick={(e) => this.addReminder(e)}
                                    disabled={this.state.disabled}
                                >
                                    Add a meeting
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row meeting-list-container">
                        <h2>List of meetings</h2>
                        <RemindersList
                            reminders={this.props.reminders}
                            deleteReminder={this.props.deleteReminder}
                        />
                    </div>
                    <div className="row row form-container">
                        {this.props.reminders.length &&
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="filterInputStartVal">Filter meetings by date</label>
                                    <input
                                        className="form-control"
                                        type="datetime"
                                        id="filterInputStartVal"
                                        defaultValue={momentNow()}
                                        ref={(el) => { this.filterInputStartVal = el; }}
                                    />
                                    <input
                                        className="form-control"
                                        type="datetime"
                                        id="filterInputEndVal"
                                        defaultValue={momentNow()}
                                        ref={(el) => { this.filterInputEndVal = el; }}
                                    />
                                    <button
                                        className="btn btn-primary filter"
                                        type="button"
                                        id="filter-meetings"
                                        onClick={(e) => this.filterReminder(e)}>
                                        Filter meetings
                                    </button>
                                    <button
                                        className="btn btn-danger clear"
                                        type="button"
                                        onClick={(e) => this.clearReminders(e)}>
                                        Clear all
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </section>
            </div>
        );
    }
}

export default connect((state) => ({
    reminders: state
}), { addReminder, deleteReminder, filterReminder, clearReminders })(App);
