export const SIGN_UP = "SIGN_UP";

export const signUpAction = (username,email,password) => {
  return {
    type:"SIGN_UP",
    payload:[username,email,password]
  }
}
