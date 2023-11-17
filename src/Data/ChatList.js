import {user_1, user_2, user_3} from './ChatRoom';

const dateFormatter = timestamp => {
  const date = new Date(timestamp);

  const today = new Date(); // Get the current date.

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isYesterday =
    new Date(date.getTime() + 86400000).getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const addLeadingZero = value => {
    return value < 10 ? `0${value}` : value.toString();
  };

  let formattedDate;

  if (isToday) {
    formattedDate = 'Today';
  } else if (isYesterday) {
    formattedDate = 'Yesterday';
  } else {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    formattedDate = `${addLeadingZero(day)}/${addLeadingZero(
      month,
    )}/${addLeadingZero(year)}`;
  }

  return formattedDate;
};

export const chatList = [
  {
    user_id: 1,
    name: 'Alice Johnson',
    last_msg: user_1[0].text,
    modified_date: dateFormatter(user_1[0].createdAt),
  },
  {
    user_id: 2,
    name: 'Bob Smith',
    last_msg: user_2[0].text,
    modified_date: dateFormatter(user_2[0].createdAt),
  },
  {
    user_id: 3,
    name: 'Eva Williams',
    last_msg: user_3[0].text,
    modified_date: dateFormatter(user_3[0].createdAt),
  },
  {
    user_id: 4,
    name: 'David Brown',
    last_msg: 'See you later!',
    modified_date: dateFormatter(user_3[0].createdAt),
  },
  {
    user_id: 5,
    name: 'Olivia Davis',
    last_msg: "I'm on my way!",
    modified_date: dateFormatter(user_3[0].createdAt),
  },
  {
    user_id: 6,
    name: 'Michael Lee',
    last_msg: 'Have a great day!',
    modified_date: dateFormatter(user_3[1].createdAt),
  },
  {
    user_id: 7,
    name: 'Sophia White',
    last_msg: "What's new?",
    modified_date: dateFormatter(user_3[1].createdAt),
  },
  {
    user_id: 8,
    name: 'James Miller',
    last_msg: "Let's catch up soon!",
    modified_date: dateFormatter(user_3[1].createdAt),
  },
  {
    user_id: 9,
    name: 'Emma Harris',
    last_msg: 'Meeting in 15 minutes',
    modified_date: dateFormatter(user_3[1].createdAt),
  },
  {
    user_id: 10,
    name: 'Daniel Wilson',
    last_msg: 'See you at the party!',
    modified_date: dateFormatter(user_3[1].createdAt),
  },
];
