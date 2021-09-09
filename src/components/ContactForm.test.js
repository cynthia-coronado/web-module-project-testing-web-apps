import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.queryByText(/contact form/i)
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent(/contact form/i)
    expect(header).toBeTruthy()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name*/i)
    userEvent.type(firstName, 'Cyn')
    const errorMessage = await screen.queryAllByTestId("error")
    expect(errorMessage).toHaveLength(1)
    // expect(errorMessage).toBeInTheDocument()
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name/i)
    userEvent.type(firstName, '')
    const lastName = screen.getByLabelText(/last name/i)
    userEvent.type(lastName, '')
    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, '')
    const submit = screen.getByRole('button')
    userEvent.click(submit)
    const errorMessage = await screen.queryAllByTestId("error")
    expect(errorMessage).toHaveLength(3)
    // expect(errorMessage).toBeInTheDocument()
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name/i)
    userEvent.type(firstName, 'Cynthia')
    const lastName = screen.getByLabelText(/last name/i)
    userEvent.type(lastName, 'Coronado')
    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, '')
    const submit = screen.getByRole('button')
    userEvent.click(submit)
    const errorMessage = await screen.queryAllByTestId("error")
    expect(errorMessage).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, 'cynthia.softball12@')
    const errorMessage = await screen.getByText(/email must be a valid email address/i)
    expect(errorMessage).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const lastName = screen.getByLabelText(/last name/i)
    userEvent.type(lastName, '')
    const submit = screen.getByRole('button')
    userEvent.click(submit)
    const errorMessage = await screen.getByText(/lastName is a required field/i)
    expect(errorMessage).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name/i)
    userEvent.type(firstName, 'Cynthia')
    const lastName = screen.getByLabelText(/last name/i)
    userEvent.type(lastName, 'Coronado')
    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, 'cynthia.softball12@gmail.com')
    const message = screen.getByLabelText(/message/i)
    userEvent.type(message, '')
    const submit = screen.getByRole('button')
    userEvent.click(submit)

    await waitFor(() => {
        const showFirstName = screen.queryByText('Cynthia')
        expect(showFirstName).toBeInTheDocument()
        const showLastName = screen.queryByText('Coronado')
        expect(showLastName).toBeInTheDocument()
        const showEmail = screen.queryByText('cynthia.softball12@gmail.com')
        expect(showEmail).toBeInTheDocument()
        const showMessage = screen.queryByText('codecodecodecode')
        expect(showMessage).not.toBeInTheDocument()
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name/i)
    userEvent.type(firstName, 'Cynthia')
    const lastName = screen.getByLabelText(/last name/i)
    userEvent.type(lastName, 'Coronado')
    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, 'cynthia.softball12@gmail.com')
    const message = screen.getByLabelText(/message/i)
    userEvent.type(message, 'codecodecode')
    const submit = screen.getByRole('button')
    userEvent.click(submit)

    await waitFor(() => {
        const showFirstName = screen.queryByText('Cynthia')
        expect(showFirstName).toBeInTheDocument()
        const showLastName = screen.queryByText('Coronado')
        expect(showLastName).toBeInTheDocument()
        const showEmail = screen.queryByText('cynthia.softball12@gmail.com')
        expect(showEmail).toBeInTheDocument()
        const showMessage = screen.queryByTestId(/message/i)
        expect(showMessage).toBeInTheDocument()
    })
});