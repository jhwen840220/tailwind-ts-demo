import { signIn, signOut } from 'next-auth/react';
export const logOut = () => {
  setCookie('token', '', 1);
  signOut();
};
export const Fetch = (path, options = {}, callback = null) => {
  options = options || {};

  fetch(path, {
    ...options,
    headers: {
      'content-type': 'application/json',
      Authorization: getCookie('token'),
    },
  })
    .then(res => {
      const { status } = res;
      if (status === 401) {
        alert('token 已失效，請重新登入');
        logOut();
        return;
      }
      callback && callback(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

export const getCookie = cname => {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
