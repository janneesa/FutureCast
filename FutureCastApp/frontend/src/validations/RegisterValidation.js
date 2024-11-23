// RegisterValidation.js

import { mockData } from "../data/MockData";

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }
  return "";
};

export const validateUserName = (username) => {
  if (username.length < 3) {
    return "Username must be at least 3 characters long";
  } else if (username.length > 10) {
    return "Username must be at most 10 characters long";
  }
  return "";
};

export const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  return "";
};

export const checkPasswordMatch = (id, password) => {
  const user = mockData.users.find((user) => user.id === id);
  if (user.password !== password) {
    return "Incorrect password";
  }
  return "";
};

export const validateDateofbirth = (dateofbirth) => {
  if (!dateofbirth) {
    return "Date of birth is required";
  }

  const today = new Date();
  const birthDate = new Date(dateofbirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 18) {
    return "You must be at least 18 years old";
  }
  return "";
};
