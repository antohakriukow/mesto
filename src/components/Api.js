import config from '../utils/utils.js'

export default class Api {
  constructor(options) {
    this.headers = options.headers
    this.url = options.url
  }

  getCheckedResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Sorry, something went wrong. Error: ${res.status}`)
  }

//User Methods:

  getUserData() {return fetch(`${this.url}/users/me`, {headers: this.headers})
    .then(this.getCheckedResponse)
  }

  setUserData(user) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
    .then(this.getCheckedResponse)
  }

  setUserAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(avatar),
    })
    .then(this.getCheckedResponse)
  }

//Place methods
  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
    .then(this.getCheckedResponse)
  }

  addCard(card) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      })
    })
    .then(this.getCheckedResponse)
  }

  removeCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this.getCheckedResponse)
  }

  likeCard(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers,
    })
    .then(this.getCheckedResponse)
  }

  dislikeCard(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this.getCheckedResponse)
  }
}