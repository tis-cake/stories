import { Observer } from '../observer';

class DataModel extends Observer {
  constructor() {
    super();
    this._data = null;
    this._lastIndex = null;
    this._currentIndex = null;
  }

  setData(modelEventType, data) {
    this._data = data;
    this._lastIndex = data.length - 1;

    this._notify(modelEventType);
  }

  setCurrentPageIndex(index) {
    this._currentIndex = Number(index);
  }

  getCurrentPageIndex() {
    return this._currentIndex;
  }

  getLastPageIndex() {
    return this._lastIndex;
  }

  getCurrentPageData(index) {
    this.setCurrentPageIndex(index);
    return this._data[this._currentIndex];
  }

  updateSelectedVote(modelEventType, id) {
    const pageVote = this._data[this._currentIndex].data;
    const pageLeaders = this._data[this._currentIndex + 1].data;

    const currentVotedUser = pageLeaders.users.find((user) => user.id === id);
    const isSameVotes = (currentVotedUser.id === pageLeaders.selectedUserId);

    if (isSameVotes) {
      return;
    }

    pageLeaders.selectedUserIdPrev = pageLeaders.selectedUserId;
    pageLeaders.selectedUserId = id;
    pageVote.selectedUserId = id;

    this._changeVotesValueUsers(pageVote, pageLeaders, currentVotedUser);
    this._sortUsers(pageLeaders);

    this._notify(modelEventType, id);
  }

  _changeVotesValueUsers(pageVote, pageLeaders, currentVotedUser) {
    if (pageLeaders.selectedUserIdPrev) {
      const prevVotedUser = pageLeaders.users.find((el) => el.id === pageLeaders.selectedUserIdPrev);
      const valueDecremented = parseInt(prevVotedUser.valueText, 10) - 1;
      prevVotedUser.valueText = `${valueDecremented} votes`;
    }

    const valueIncremented = parseInt(currentVotedUser.valueText, 10) + 1;
    currentVotedUser.valueText = `${valueIncremented} votes`;
  }

  _sortUsers(pageLeaders) {
    pageLeaders.users.sort((a, b) => parseInt(b.valueText, 10) - parseInt(a.valueText, 10));
  }
}

export { DataModel };
