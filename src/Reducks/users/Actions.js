export const SIGN_UP = "SIGN_UP";

export const signUpAction = (username,email,password) => {
  return {
    type:"SIGN_UP",
    payload:[username,email,password]
  }
}

export const SIGN_IN = "SIGN_IN";

export const signInAction = (user) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      uid: user.uid,
      username: user.username
    }
  }
};

export const SIGN_OUT = "SIGN_OUT";

export const signOutAction = () => {
  return {
    type: SIGN_OUT,
    payload: {
      isSignedOut: false,
      uid: "",
      username: ""
    }
  }
}