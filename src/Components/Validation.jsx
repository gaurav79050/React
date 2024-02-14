import React from "react";
import { toast } from "react-toastify";

export const validateForm = (userData) => {
  let flag = true;

  for (let key in userData) {
    if (
      key == "contact" &&
      userData[key].length !== 0 &&
      userData[key].length !== 10
    ) {
      toast.error(`${key} number should be only 10 digit`);
      flag = false;
    }

    if (key == "contact" || key == "image") {
      continue;
    }

    if (!userData[key].trim()) {
      toast.error(`${key} is required`);
      flag = false;
    }
  }

  return flag;
};
