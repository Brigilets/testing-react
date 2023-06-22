import { screen, render, within } from "@testing-library/react";
import UserList from "./UserList";

function renderComponent() {
  const users = [
    { name: "jane", email: "jane@jane.com" },
    { name: "sam", email: "sam@sam.com" },
  ];

  render(<UserList users={users} />);

  return {
    users,
  };
}


test("render one row per user", () => {
  // Render the component
  renderComponent();
  // ## 2nd option ##
  //   const { container } = render(<UserList users={users} />);
  //Find all rows in the component MUST ADD: data-testid="users" in jsx
  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  // ## 2nd option ##
  // eslint-disable-next-line
  //   const rows = container.querySelectorAll("tbody tr");
  // 2nd way to find rows

  // Assertion: correct number of rows in the table
  //   expect(rows).toHaveLength(2);
  expect(rows).toHaveLength(2);
});

test("render email & name for each user", () => {
  // Render the component

  const { users } = renderComponent();
  // Find the elements containing name and email

  //   screen.logTestingPlaygroundURL();

  for (let user of users) {
    const name = screen.getAllByRole("cell", { name: user.name })[0];
    const email = screen.getAllByRole("cell", { email: user.email })[0];

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
