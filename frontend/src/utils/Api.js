// import React from "react";

// export

class Api {
  constructor(config) {
    this.headers = config.headers;
    this.baseURL = config.baseURL;
  }

  // Проверка ответа от сервера на ошибку

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // получение карточек с сервера методом GET

  handleGetCards() {
    return fetch(`${this.baseURL}/cards`, {
      headers: this.headers,
      method: "GET",
    }).then((res) => this._handleResponse(res));
  }

  // создание карточки и отправка на сервер методом POST

  handleCreateCard(item) {
    return fetch(`${this.baseURL}/cards`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    }).then((res) => this._handleResponse(res));
  }

  // удаление карточки с сервера методом DELETE

  handleRemoveCard(id) {
    return fetch(`${this.baseURL}/cards/${id}`, {
      headers: this.headers,
      method: "DELETE",
    }).then((res) => this._handleResponse(res));
  }

  // Добавление лайка запросом на сервер методом PUT

  handleLikeAdd(id) {
    return fetch(`${this.baseURL}/cards/${id}/likes`, {
      headers: this.headers,
      method: "PUT",
    }).then((res) => this._handleResponse(res));
  }

  // Удаление лайка запросом на сервер методом DELETE

  handleLikeRemove(id) {
    return fetch(`${this.baseURL}/cards/${id}/likes`, {
      headers: this.headers,
      method: "DELETE",
    }).then((res) => this._handleResponse(res));
  }

  // получаем данные пользователя с сервера методом GET

  getUserInfo() {
    return fetch(`${this.baseURL}/users/me`, {
      headers: this.headers,
      method: "GET",
    }).then((res) => this._handleResponse(res));
  }

  // отправляем данные пользователя на сервер методом PATCH

  setUserInfo(data) {
    return fetch(`${this.baseURL}/users/me`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._handleResponse(res));
  }

  // отправляем данные аватара на сервер методом PATCH

  setUserAvatar(data) {
    return fetch(`${this.baseURL}/users/me/avatar`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._handleResponse(res));
  }
}

export const api = new Api({
  baseURL: "https://mesto.nomoreparties.co/v1/cohort-60/",
  headers: {
    authorization: "d2dcd824-54c6-405c-a2b8-915a4a5b4711",
    "Content-Type": "application/json",
  },
});

export default api;
