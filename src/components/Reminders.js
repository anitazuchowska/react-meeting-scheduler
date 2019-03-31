import React from 'react';

import { momentLocale } from '../utilities/helpers'

class RemindersList extends React.Component {
    handleClick(e) {
        e.currentTarget.classList.toggle('open')
      }

    componentWillMount () {
        clearInterval(this.interval);
    }
    componentDidMount () {
        this.interval = setInterval(
            this.forceUpdate.bind(this),
            parseInt(this.props.updateInterval, 10) || 100
        );
    }

    render () {
        const { reminders, deleteReminder } = this.props;
        return (

            <ul className="list-group">
                {
                    reminders.map((reminder) => (
                        <li key={reminder.id} className="list-group-item clearfix" onClick={this.handleClick}>
                            <h2 className="list-group-item-title">
                            <span>{reminder.title}</span>
                            <button
                                className="btn btn-danger btn-xs"
                                onClick={() => deleteReminder(reminder.id)}>
                                &#x2715;
                            </button>
                            </h2>
                            <div className="list-group-item-content">
                                <p className="reminder-info">{reminder.info}</p>
                                <div className="list-item time">
                                    Date of the beginning of the meeting: <strong>{momentLocale(reminder.meetingStartDate)}</strong>
                                </div>
                                <div className="list-item time">
                                    The end date of the meeting: <strong>{momentLocale(reminder.meetingEndDate)}</strong>
                                </div>
                            </div>
                        </li>))
                }
            </ul>);
    }
}

export default RemindersList;
