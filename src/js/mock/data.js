import { Page } from '../consts';
import {
  getMockMostVotes,
  getMockMostCommits,
  getMockBiggestCommit,
} from '../utils/mock';

const DATA_SUBTITLE = 'Спринт № 213';

const getMockData = (data) => {
  const usersMockMostCommits = getMockMostCommits(data);
  const usersMockBiggestCommit = getMockBiggestCommit(data);
  const usersMockMostVotesFirst = getMockMostVotes(data);
  const usersMockMostVotesSecond = getMockMostVotes(data);

  return [
    {
      alias: Page.LEADERS,
      data: {
        title: 'Больше всего коммитов',
        subtitle: DATA_SUBTITLE,
        emoji: '👑',
        users: usersMockBiggestCommit,
      },
    },
    {
      alias: Page.LEADERS,
      data: {
        title: 'Самый большой коммит',
        subtitle: DATA_SUBTITLE,
        emoji: '😮',
        users: usersMockMostCommits,
      },
    },
    {
      alias: Page.VOTE,
      data: {
        title: 'Самый 🔎 внимательный разработчик',
        subtitle: DATA_SUBTITLE,
        emoji: '🔎',
        selectedUserId: 4,
        users: usersMockMostVotesFirst,
      },
    },
    {
      alias: Page.LEADERS,
      data: {
        title: 'Самый 🔎 внимательный разработчик',
        subtitle: DATA_SUBTITLE,
        emoji: '🔎',
        selectedUserId: 11,
        users: usersMockMostVotesFirst,
      },
    },
    {
      alias: Page.VOTE,
      data: {
        title: 'Самый 👪 командный разработчик',
        subtitle: DATA_SUBTITLE,
        emoji: '👪',
        offset: 8,
        users: usersMockMostVotesSecond,
      },
    },
    {
      alias: Page.LEADERS,
      data: {
        title: 'Самый 👪 командный разработчик',
        subtitle: DATA_SUBTITLE,
        emoji: '👪',
        selectedUserId: 6,
        users: usersMockMostVotesSecond,
      },
    },
    {
      alias: Page.CHART,
      data: {
        title: 'Коммиты',
        subtitle: DATA_SUBTITLE,
        values: [
          { title: '203', value: 108 },
          { title: '204', value: 160 },
          { title: '205', value: 126 },
          { title: '206', value: 134 },
          { title: '207', value: 112 },
          { title: '208', value: 152 },
          { title: '209', value: 128 },
          { title: '210', value: 164 },
          { title: '211', value: 118 },
          { title: '212', value: 140 },
          { title: '213', value: 182, active: true },
          { title: '214', value: 0 },
          { title: '215', value: 0 },
          { title: '216', value: 0 },
          { title: '217', value: 0 },
          { title: '218', value: 0 },
        ],
        users: usersMockBiggestCommit,
      },
    },
    {
      alias: Page.CHART,
      data: {
        title: 'Строки кода',
        subtitle: DATA_SUBTITLE,
        values: [
          { title: '203', value: 4779 },
          { title: '204', value: 6859 },
          { title: '205', value: 5547 },
          { title: '206', value: 6307 },
          { title: '207', value: 5191 },
          { title: '208', value: 6585 },
          { title: '209', value: 6069 },
          { title: '210', value: 7063 },
          { title: '211', value: 5729 },
          { title: '212', value: 6283 },
          { title: '213', value: 9415, active: true },
          { title: '214', value: 0 },
          { title: '215', value: 0 },
          { title: '216', value: 0 },
          { title: '217', value: 0 },
          { title: '218', value: 0 },
        ],
        users: usersMockMostCommits,
      },
    },
    {
      alias: Page.DIAGRAM,
      data: {
        title: 'Размер коммитов',
        subtitle: DATA_SUBTITLE,
        totalText: '182 коммита',
        differenceText: '+42 с прошлого спринта',
        categories: [
          { title: '> 1001 строки', valueText: '30 коммитов', differenceText: '+8 коммитов' },
          { title: '501 — 1000 строк', valueText: '32 коммита', differenceText: '+6 коммитов' },
          { title: '101 — 500 строк', valueText: '58 коммитов', differenceText: '+16 коммитов' },
          { title: '1 — 100 строк', valueText: '62 коммита', differenceText: '+12 коммитов' },
        ],
      },
    },
    {
      alias: Page.ACTIVITY,
      data: {
        title: 'Коммиты, 1 неделя',
        subtitle: DATA_SUBTITLE,
        data: {
          mon: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 3, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
          tue: [0, 0, 0, 0, 1, 0, 0, 0, 0, 5, 0, 4, 0, 0, 0, 0, 1, 0, 3, 0, 0, 2, 1, 0],
          wed: [1, 0, 0, 0, 1, 0, 5, 0, 0, 4, 0, 0, 0, 5, 0, 2, 1, 0, 0, 0, 0, 0, 0, 1],
          thu: [0, 1, 0, 1, 0, 0, 0, 0, 6, 0, 1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 1, 0, 0, 0],
          fri: [0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 5, 0, 4, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0],
          sat: [0, 0, 0, 0, 2, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
          sun: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
        },
      },
    },
    {
      alias: Page.ACTIVITY,
      data: {
        title: 'Коммиты, 2 неделя',
        subtitle: DATA_SUBTITLE,
        data: {
          mon: [0, 1, 1, 1, 0, 0, 0, 0, 0, 4, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 2],
          tue: [0, 1, 2, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          wed: [0, 0, 0, 0, 2, 0, 1, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 0, 0],
          thu: [0, 0, 2, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 1, 2, 0, 3, 0, 1, 1, 0, 0, 0],
          fri: [0, 0, 0, 1, 1, 0, 2, 0, 4, 0, 0, 0, 2, 0, 3, 2, 0, 0, 0, 0, 1, 1, 0, 1],
          sat: [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 2, 2, 0, 2, 0, 0],
          sun: [0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1]
        },
      },
    },
  ];
};

export { getMockData };
