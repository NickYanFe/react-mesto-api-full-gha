// import React from "react";

// export

class Api {
  constructor(config) {
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
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseURL}/cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }).then((res) => this._handleResponse(res));
  }

  // создание карточки и отправка на сервер методом POST

  handleCreateCard(item) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseURL}/cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    }).then((res) => this._handleResponse(res));
  }

  // удаление карточки с сервера методом DELETE

  handleRemoveCard(cardId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseURL}/cards/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((res) => this._handleResponse(res));
  }

  // Добавление лайка запросом на сервер методом PUT

  handleLikeAdd(cardId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseURL}/cards/${cardId}/likes`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then((res) => this._handleResponse(res));
  }

  // Удаление лайка запросом на сервер методом DELETE

  handleLikeRemove(cardId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseURL}/cards/${cardId}/likes`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((res) => this._handleResponse(res));
  }

  // получаем данные пользователя с сервера методом GET

  getUserInfo() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }).then((res) => this._handleResponse(res));
  }

  // отправляем данные пользователя на сервер методом PATCH

  setUserInfo(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._handleResponse(res));
  }

  // отправляем данные аватара на сервер методом PATCH

  setUserAvatar(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseURL}/users/me/avatar`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._handleResponse(res));
  }
}

export const api = new Api({
  baseURL: "https://api.nickyanfe.nomoredomains.rocks",
  headers: {
    // authorization: "d2dcd824-54c6-405c-a2b8-915a4a5b4711",
    "Content-Type": "application/json",
  },
});

export default api;
