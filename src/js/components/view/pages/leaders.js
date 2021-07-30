import { AbstractPages } from './abstract';

import { getSelectedUserIndex } from '../../../utils/common';
import { SELECTED_USER_EMOJI } from '../../../consts';

const MAX_USERS_COUNT = 5;
const LAST_INDEX_DESKTOP = MAX_USERS_COUNT - 1;
const LAST_INDEX_MOBILE = 2;

const createUserNotIncludedMarkup = (user, index) => {
  const { name, avatar, valueText } = user;

  const placeNumber = index + 1;

  return (
    `
      <span class="leaders__not-included-wrap people__not-included-wrap">
        <span class="people__img-wrap">
          <span class="people__emoji emoji">👍</span>
          <img
            class="people__img"
            src="${avatar}"
            alt="Место №${placeNumber}. ${name}"
          >
        </span>
        <span class="people__name">
          ${name}
        </span>
        <span class="people__commit-count caption">
          ${valueText}
        </span>

        <span class="leaders__stats-value leaders__stats-value--not-included title">
          ${placeNumber}
        </span>
      </span>
    `
  );
};

const createUserMarkup = (user, index, options) => {
  const { name, avatar, valueText } = user;
  const { emoji, selectedUser } = options;
  let { selectedUserIndex } = options;

  let placeNumber = index + 1;

  let userNotIncludedMarkup;

  if (selectedUser) {
    // под первое место рендерим выбранного пользователя, если он не попал в топ 3
    if (index === 0) {
      userNotIncludedMarkup = createUserNotIncludedMarkup(selectedUser, selectedUserIndex);
    }

    // если это последний элемент на десктопе
    if (index === LAST_INDEX_DESKTOP && selectedUserIndex >= LAST_INDEX_DESKTOP) {
      placeNumber = selectedUserIndex + 1;

      selectedUserIndex = LAST_INDEX_DESKTOP;
    }
  }

  const isWinnerEmoji = (index === 0)
    ? emoji
    : '';

  const isSelectedUserEmoji = (index !== 0 && index === selectedUserIndex)
    ? SELECTED_USER_EMOJI
    : '';

  return (
    `
      <li class="leaders__item people__item">
        <span class="people__img-wrap">
          <span class="people__emoji emoji">${isWinnerEmoji}${isSelectedUserEmoji}</span>
          <img
            class="people__img"
            src="${avatar}"
            alt="Место №${placeNumber}. ${name}"
          >
        </span>
        <span class="people__name">
          ${name}
        </span>
        <span class="people__commit-count caption">
          ${valueText}
        </span>
        <p class="leaders__stats">
          <span class="leaders__stats-value title">
            ${placeNumber}
          </span>

          ${userNotIncludedMarkup ? `
            ${userNotIncludedMarkup}
          ` : ''}

        </p>
      </li>
    `
  );
};

const createUsersMarkup = (data) => {
  const { emoji, users, selectedUserId } = data;

  const selectedUserIndex = getSelectedUserIndex(selectedUserId, users);
  const isSelectedUserIncluded = (selectedUserIndex > LAST_INDEX_MOBILE && selectedUserIndex <= LAST_INDEX_DESKTOP);
  const isSelectedUserNotIncluded = (selectedUserIndex > LAST_INDEX_DESKTOP);

  let selectedUser;
  let usersMarkup = users;

  if (isSelectedUserIncluded || isSelectedUserNotIncluded) {
    selectedUser = users[selectedUserIndex];
  }

  if (users.length > MAX_USERS_COUNT) {
    usersMarkup = users.slice(0, MAX_USERS_COUNT);
  }

  // если выбранный пользователь не в топ 5 - добавить на 5 место
  if (isSelectedUserNotIncluded) {
    usersMarkup = usersMarkup.slice(0, LAST_INDEX_DESKTOP);
    usersMarkup.push(selectedUser);
  }

  const extraOptions = { emoji, selectedUserIndex, selectedUser };

  return usersMarkup
    .map((el, i) => createUserMarkup(el, i, extraOptions))
    .join('');
};

const createLeadersTemplate = (data) => {
  const { title, subtitle } = data;

  const usersMarkup = createUsersMarkup(data);

  return (
    `
      <section class="leaders container">
        <div class="board__text-wrap leaders__text-wrap">
          <h1 class="board__title leaders__title title">
            ${title}
          </h1>
          <h2 class="board__subtitle leaders__subtitle">
            ${subtitle}
          </h2>
        </div>

        <ul class="leaders__list people">
          ${usersMarkup}
        </ul>
    `
  );
};

class Leaders extends AbstractPages {
  getTemplate() {
    return createLeadersTemplate(this._data);
  }
}

export { Leaders };
