import {format} from 'date-fns'
import moment from 'moment';

export function getTodayDate() {
  return format(new Date(), 'yyyy-MM-dd');
}

export function getWeeklyStartDate() {
  const prev = moment(getTodayDate()).subtract(7, 'days');
  return format(prev._d, 'yyyy-MM-dd');
}

export function getAllTimeStartDate() {
  return '2023-01-01'
}

export const states = [
  "Select State",
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara"
]

export const getInitials = name => {
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  let initials = [...name.matchAll(rgx)] || [];
  initials = ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase();
  return initials;
};
