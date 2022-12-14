import React from "react";
import { screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouter";

describe('all tests from footer component', () => {
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'removeItem')
  Object.setPrototypeOf(window.localStorage.removeItem, jest.fn())

  test('the acess page without login', () => {
    renderWithRouter(<App />, ['/profile'])

    const emailProfile = screen.getByTestId('profile-email')

    expect(emailProfile).toHaveTextContent(/email/i)
  })

  test('if the elements are in the page', () => {
    renderWithRouter(<App />, ['/']);
    const email = screen.getByTestId('email-input')
    const password = screen.getByTestId('password-input')
    const buttonLogin = screen.getByTestId('login-submit-btn')

    userEvent.type(email, 'email@teste.com')
    userEvent.type(password, '123456789')
    userEvent.click(buttonLogin)

    const buttonProfile = screen.getByTestId('profile-top-btn')

    userEvent.click(buttonProfile)

    const emailProfile = screen.getByTestId('profile-email')
    const doneRecipesBtn = screen.getByTestId('profile-done-btn')
    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn')
    const logoutRecipesBtn = screen.getByTestId('profile-logout-btn')

    expect(emailProfile).toBeInTheDocument()
    expect(doneRecipesBtn).toBeInTheDocument()
    expect(favoriteRecipesBtn).toBeInTheDocument()
    expect(logoutRecipesBtn).toBeInTheDocument()
    expect(emailProfile).toHaveTextContent('email: email@teste.com')
  });

  test('if the button done recipes redirects', () => {
    renderWithRouter(<App />, ['/']);
    const email = screen.getByTestId('email-input')
    const password = screen.getByTestId('password-input')
    const buttonLogin = screen.getByTestId('login-submit-btn')

    userEvent.type(email, 'email@teste.com')
    userEvent.type(password, '123456789')
    userEvent.click(buttonLogin)

    const buttonProfile = screen.getByTestId('profile-top-btn')

    userEvent.click(buttonProfile)
    const doneRecipesBtn = screen.getByTestId('profile-done-btn')

    userEvent.click(doneRecipesBtn)
  });

  test('if the button favorite recipes redirects', () => {
    renderWithRouter(<App />, ['/']);
    const email = screen.getByTestId('email-input')
    const password = screen.getByTestId('password-input')
    const buttonLogin = screen.getByTestId('login-submit-btn')

    userEvent.type(email, 'email@teste.com')
    userEvent.type(password, '123456789')
    userEvent.click(buttonLogin)

    const buttonProfile = screen.getByTestId('profile-top-btn')

    userEvent.click(buttonProfile)

    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn')

    userEvent.click(favoriteRecipesBtn)
  });

  test('if the localStorage is called', () => {
    renderWithRouter(<App />, ['/']);
    const email = screen.getByTestId('email-input')
    const password = screen.getByTestId('password-input')
    const buttonLogin = screen.getByTestId('login-submit-btn')

    userEvent.type(email, 'email@teste.com')
    userEvent.type(password, '123456789')
    userEvent.click(buttonLogin)

    const buttonProfile = screen.getByTestId('profile-top-btn')

    userEvent.click(buttonProfile)

    const logoutRecipesBtn = screen.getByTestId('profile-logout-btn')
    userEvent.click(logoutRecipesBtn)

    expect(window.localStorage.removeItem).toHaveBeenCalledTimes(6)
  });

});
