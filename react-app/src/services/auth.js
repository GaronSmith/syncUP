export const authenticate = async() => {
  const response = await fetch('/api/auth/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

export const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  return await response.json();
}

export const logout = async () => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return await response.json();
};


export const signUp = async (username, email, imageFile, password) => {

  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);

  if(imageFile) formData.append("imageFile", imageFile);

  // console.log(imageFile)
  // for (let pair of formData.entries()) {
  //   console.log(pair[0]+ ', ' + pair[1]);
  // }

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.log("ERROR")
    console.log(response)
    return {errors: "Server Error"}
  }
}
