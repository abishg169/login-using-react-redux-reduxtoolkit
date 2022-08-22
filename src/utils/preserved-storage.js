export function removeLoginDetails() {
  setTimeout(() => {
    localStorage.clear()
    sessionStorage.clear()
    window.location.reload()
  })
}


export function getToken () {
  const data = localStorage.getItem("accessKey");
  if (data) {
    return data;
  } else {
    return null;
  }
}

export function setToken (token) {
  localStorage.setItem("accessKey", token);
}

export function removeToken () {
  localStorage.removeItem("accessKey");
}
export function getTokenType () {
  const data = localStorage.getItem("accessKeyType");
  if (data) {
    return data;
  } else {
    return null;
  }
}

export function setTokenType (token) {
  localStorage.setItem("accessKeyType", token);
}

export function removeTokenType () {
  localStorage.removeItem("accessKeyType");
}
