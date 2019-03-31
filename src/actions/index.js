import { ReminderActions } from '../enums/reminder.actions';

export const addReminder = (title, meetingStartDate, meetingEndDate, info) => ({
    type: ReminderActions.ADD_REMINDER,
    title,
    meetingStartDate,
    meetingEndDate,
    info
});

export const filterReminder = (filterInputStartVal, filterInputEndVal) => ({
    type: ReminderActions.FILTER_REMINDER,
    filterInputStartVal,
    filterInputEndVal
});

export const deleteReminder = (id) => {
    const action = {
        type: ReminderActions.DELETE_REMINDER,
        id
    };
    return action;
};

export const clearReminders = () => ({
    type: ReminderActions.CLEAR_REMINDERS
});
