import { screen, render, within } from "@testing-library/react";
import UserList from "./UserList";

test("render one row per user", () => {
  // Render the component
  const users = [
    { name: "jane", email: "jane@jane.com" },
    { name: "sam", email: "sam@sam.com" },
  ];

  render(<UserList users={users} />);
  //   const { container } = render(<UserList users={users} />);
  //Find all rows in the component MUST ADD: data-testid="users" in jsx
  const rows = within(screen.getByTestId("users")).getAllByRole("row");
  // eslint-disable-next-line
  //   const rows = container.querySelectorAll("tbody tr");
  // 2nd way to find rows

  // Assertion: correct number of rows in the table
  //   expect(rows).toHaveLength(2);
  expect(rows).toHaveLength(2);
});

test("render email & name for each user", () => {});
