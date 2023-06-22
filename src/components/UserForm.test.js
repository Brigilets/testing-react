import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows 2 inputs and a button", () => {
  // Render the component
  render(<UserForm />);

  //   manipulate the component or find element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // Assertion - ensure the component works as expected

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", async () => {
  // NOT THE BEST IMPLEMENTATION
  //   const argList = [];
  //   const callback = (...args) => {
  //     argList.push(args);
  //   };

  // creating mock function
  const mock = jest.fn();
  // Try to render my component
  render(<UserForm onUserAdd={mock} />);

  // Find the two inputs
  // breaks if we change the order of inputs or add extra inputs
  //   const [nameInput, emailInput] = screen.getAllByRole("textbox");

  //works if they just simply exist, doesn't depend on the order
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  // Simulate typing in a name
  user.click(nameInput);
  user.keyboard("jane");
  // Simulate typing in an email
  user.click(emailInput);
  user.keyboard("jane@jane.com");
  // Find the button
  const button = screen.getByRole("button");
  // Simulate clicking the button
  user.click(button);
  // Assertion to make sure 'onUserAdd' gets called with email/name
  //For using a callback
  //   expect(argList).toHaveLength(1);
  //   expect(argList[0][0]).toEqual({ name: "jane", email: "jane@jane.com" });

  // for using mock function from jest
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "jane", email: "jane@jane.com" });
});

test("the input fields are emptied upon submittion", async () => {
  // empty callback as we don't care if the function gets called
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  user.click(nameInput);
  user.keyboard("Brigi");
  user.click(emailInput);
  user.keyboard("brigi@brigi.com");

  user.click(button);

  await waitFor(() => {
    expect(nameInput).toHaveValue("");
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(emailInput).toHaveValue("");
  });
});
