import { screen, fireEvent, render, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import Login from "../pages/login";

// replace the router with the mock
jest.mock("next/router", () => require("next-router-mock"));

const newUser = {
  email: "zbeeblbrox@galaxy.gov",
  password: "gargleblaster",
};

const oldUser = {
  email: "fprefect@megadod.com",
  password: "hitchhiker",
};

jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  getAuth: jest
    .fn()
    .mockImplementation(() => ({ currentUser: { isAnonymous: true } })),
  createUserWithEmailAndPassword: jest
    .fn()
    .mockImplementation((auth, email, password) => {
      if (
        !(email.includes("@") && email.indexOf("@") < email.lastIndexOf("."))
      ) {
        throw { message: "Firebase: Error (auth/invalid-email)." };
      } else if (password.length < 6) {
        throw { message: "Firebase: Error (auth/weak-password)." };
      } else if (email === oldUser.email) {
        throw { message: "Firebase: Error (auth/email-already-in-use)." };
      }
    }),
  signInWithEmailAndPassword: jest
    .fn()
    .mockImplementation((auth, email, password) => {
      if (!(email.includes("@") && email.indexOf("@") < email.indexOf("."))) {
        throw { message: "Firebase: Error (auth/invalid-email)." };
      } else if (email === oldUser.email && password !== oldUser.password) {
        throw { message: "Firebase: Error (auth/wrong-password)." };
      } else if (email !== oldUser.email) {
        throw { message: "Firebase: Error (auth/user-not-found)." };
      }
    }),
}));

function performLogin(email, password, createUser) {
  const { container } = render(<Login />);

  // default state is returning user, click toggle to switch
  if (createUser) {
    const checkbox = container.querySelector("input[type=checkbox]");
    fireEvent.click(checkbox);
  }

  const loginButtonText = createUser ? "Register" : "Log in";

  const emailInput = container.querySelector("input[type=text]");
  const passwordInput = container.querySelector("input[type=password]");
  const loginButton = screen.getByRole("button", { name: loginButtonText });

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.click(loginButton);
}

describe("login: Log in page tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRouter.setCurrentUrl("/login");
  });

  describe("Login: new user tests", () => {
    test("Login: When new user, calls createUserWithEmailAndPassword", async () => {
      performLogin(newUser.email, newUser.password, true);

      expect(getAuth).toHaveBeenCalled();
      expect(createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
      await waitFor(() => expect(mockRouter.asPath).toBe("/"));
    });

    test("Login: When new user, invalid-email is handled", async () => {
      performLogin("zaphod", newUser.password, true);

      const error = await screen.findByText(
        "zaphod is not recognized as a valid email address"
      );

      expect(error).toBeVisible();
    });
    test("Login: When new user, weak-password is handled", async () => {
      performLogin(newUser.email, "123", true);
      const error = await screen.findByText(
        "Password should be at least 6 characters"
      );

      expect(error).toBeVisible();
    });
    test("Login: When new user, email-already-in-use is handled", async () => {
      performLogin(oldUser.email, newUser.password, true);
      const error = await screen.findByText(
        `${oldUser.email} is already in use`
      );

      expect(error).toBeVisible();
    });
  });

  describe("Login: returning user tests", () => {
    test("Login: When returning user, calls signInWithEmailAndPassword", async () => {
      performLogin(oldUser.email, oldUser.password, false);

      expect(getAuth).toHaveBeenCalled();
      expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
      expect(signInWithEmailAndPassword).toHaveBeenCalled();
      await waitFor(() => expect(mockRouter.asPath).toBe("/"));
    });

    test("Login: When returning user, invalid-email is handled", async () => {
      performLogin("ford", oldUser.password, false);
      const error = await screen.findByText(
        "ford is not recognized as a valid email address"
      );

      expect(error).toBeVisible();
    });

    test("Login: When returning user, invalid credentials are handled", async () => {
      performLogin(oldUser.email, newUser.password, false);
      const error = await screen.findByText(
        "Email address or password is incorrect"
      );

      expect(error).toBeVisible();
    });
  });
});
