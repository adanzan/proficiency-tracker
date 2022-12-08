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
  first: "zbeel",
  last: "brox",
  middleburyId: "01",
};

const oldUser = {
  email: "fprefect@megadod.com",
  password: "hitchhiker",
  first: "f",
  last: "prefect",
  middleburyId: "02",
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

function performLogin(email, password, first, last, middleburyId, createUser) {
  render(<Login />);

  // default state is returning user, click toggle to switch
  if (createUser) {
    const checkbox = screen.getByTestId("newUserCheckbox");
    fireEvent.click(checkbox);
  }

  const loginButtonText = createUser ? "Register" : "Log in";
  const loginButton = screen.getByRole("button", { name: loginButtonText });

  const emailInput = screen.getByPlaceholderText("email address");
  const passwordInput = screen.getByPlaceholderText("password");

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });

  // Separately fill in the rest of the registration forms if it is a new user
  if (createUser) {
    const firstNameInput = screen.getByPlaceholderText("first name");
    const lastNameInput = screen.getByPlaceholderText("last name");
    const middIdInput = screen.getByPlaceholderText("middlebury ID");
    fireEvent.change(firstNameInput, { target: { value: first } });
    fireEvent.change(lastNameInput, { target: { value: last } });
    fireEvent.change(middIdInput, { target: { value: middleburyId } });
  }

  fireEvent.click(loginButton);
}

describe("Login: Log in page tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRouter.setCurrentUrl("/login");
  });

  describe("Login: New user tests", () => {
    describe("Login: New user registration element tests", () => {});

    test.skip("Login: When new user, calls createUserWithEmailAndPassword", async () => {
      performLogin(
        newUser.email,
        newUser.password,
        newUser.first,
        newUser.last,
        newUser.middleburyId,
        true
      );

      expect(getAuth).toHaveBeenCalled();
      expect(createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
      await waitFor(() => expect(mockRouter.asPath).toBe("/"));
    });

    test("Login: When new user, invalid-email is handled", async () => {
      performLogin(
        "zaphod",
        newUser.password,
        newUser.first,
        newUser.last,
        newUser.middleburyId,
        true
      );

      const error = await screen.findByText(
        "zaphod is not recognized as a valid email address"
      );

      expect(error).toBeVisible();
    });
    test("Login: When new user, weak-password is handled", async () => {
      performLogin(
        newUser.email,
        "123",
        newUser.first,
        newUser.last,
        newUser.middleburyId,
        true
      );
      const error = await screen.findByText(
        "Password should be at least 6 characters"
      );

      expect(error).toBeVisible();
    });
    test("Login: When new user, email-already-in-use is handled", async () => {
      performLogin(
        oldUser.email,
        newUser.password,
        newUser.first,
        newUser.last,
        newUser.middleburyId,
        true
      );
      const error = await screen.findByText(
        `${oldUser.email} is already in use`
      );

      expect(error).toBeVisible();
    });
  });

  describe("Login: returning user tests", () => {
    test("Login: When returning user, calls signInWithEmailAndPassword", async () => {
      performLogin(
        oldUser.email,
        oldUser.password,
        oldUser.first,
        oldUser.last,
        oldUser.middleburyId,
        false
      );

      expect(getAuth).toHaveBeenCalled();
      expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
      expect(signInWithEmailAndPassword).toHaveBeenCalled();
      await waitFor(() => expect(mockRouter.asPath).toBe("/"));
    });

    test("Login: When returning user, invalid-email is handled", async () => {
      performLogin(
        "ford",
        oldUser.password,
        oldUser.first,
        oldUser.last,
        oldUser.middleburyId,
        false
      );
      const error = await screen.findByText(
        "ford is not recognized as a valid email address"
      );

      expect(error).toBeVisible();
    });

    test("Login: When returning user, invalid credentials are handled", async () => {
      performLogin(
        oldUser.email,
        newUser.password,
        oldUser.first,
        oldUser.last,
        oldUser.middleburyId,
        false
      );
      const error = await screen.findByText(
        "Email address or password is incorrect"
      );

      expect(error).toBeVisible();
    });
  });
});
