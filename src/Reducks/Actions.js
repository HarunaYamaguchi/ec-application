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