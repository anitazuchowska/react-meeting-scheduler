import { ReminderActions } from '../enums/reminder.actions';
import { momentToDate, storageSetJSON } from '../utilities/helpers.js'

const reminderAdd = (action) => ({
    title: action.title,
    id: Math.random(),
    done: false,
    meetingStartDate: action.meetingStartDate,
    meetingEndDate: action.meetingEndDate,
    info: action.info
});

const reminderFilter = (action) => ({
    filterInputStartVal: action.filterInputStartVal,
    filterInputEndVal: action.filterInputEndVal,
});

const removeByID = (state = [], id) => {
    const reminders = state.filter(r => r.id !== id);

    return reminders;
};

const Reminders = (state = [], action) => {
    let reminders = null;
    const savedReminders = localStorage.getItem('remindlist');
    const currentState = savedReminders ? JSON.parse(savedReminders) : [];

    switch (action.type) {
        case ReminderActions.ADD_REMINDER:
            reminders = [...currentState, reminderAdd(action)];
            reminders = reminders.sort((r1, r2) => new Date(r2.meetingStartDate) - new Date(r1.meetingStartDate));

            storageSetJSON('remindlist', reminders);

            return reminders;
        case ReminderActions.FILTER_REMINDER:
            let filterlist = [];
            
            filterlist = currentState.filter((item) => {
                return momentToDate(new Date(item.meetingStartDate)) >= action.filterInputStartVal
                    && momentToDate(new Date(item.meetingEndDate)) <= action.filterInputEndVal;
            });
            
            return filterlist;
        case ReminderActions.DELETE_REMINDER:
            reminders = removeByID(currentState, action.id);

            storageSetJSON('remindlist', reminders);

            return reminders;
        case ReminderActions.CLEAR_REMINDERS:
            reminders = [];

            storageSetJSON('remindlist', reminders);

            return reminders;
        default:
            return currentState;
    }
};

export default Reminders;
