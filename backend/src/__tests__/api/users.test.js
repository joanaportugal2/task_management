const usersAPI = require("../../__calls__/api/users");
const usersDB = require("../../__calls__/db/users");
const bcrypt = require("bcryptjs");
const TIMEOUT = 7000;

const user1 = {
  username: "username",
  password: "Password123",
  email: "someone@gmail.com",
  name: "John Doe",
};

const user2 = {
  username: "immarydoe",
  password: "Password123",
  email: "email@gmail.com",
  name: "Mary Doe",
};

describe("create account", () => {
  test(
    "200 - account created and user was added on db with encrypted password",
    async () => {
      const response = await usersAPI.createAccount(user2);
      expect(response.status).toBe(200);
      expect(response.data.success).toBeTruthy();
      expect(response.data.message).toBe(`User ${user2.username} created!`);
      const user = await usersDB.readOne(user2.username);
      const check = bcrypt.compareSync(user2.password, user.password);
      expect(user).toBeTruthy();
      expect(user.password).not.toBe(user2.password);
      expect(check).toBeTruthy();
    },
    TIMEOUT
  );

  test(
    "400 - username missing",
    async () => {
      const response = await usersAPI.createAccount({
        ...user2,
        username: "",
      });
      expect(response.status).toBe(400);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toContain("Please provide a username!");
    },
    TIMEOUT
  );

  test(
    "400 - username invalid by characters",
    async () => {
      const response = await usersAPI.createAccount({
        ...user2,
        username: "i'mInvalid",
      });
      expect(response.status).toBe(400);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toContain(
        "i'mInvalid is not a valid username!"
      );
    },
    TIMEOUT
  );

  test(
    "400 - username invalid by number of characters",
    async () => {
      const response = await usersAPI.createAccount({
        ...user2,
        username: "imaverylongusername",
      });
      expect(response.status).toBe(400);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toContain(
        "Username should have between 4 and 16 characters!"
      );
    },
    TIMEOUT
  );

  test(
    "400 - password missing / invalid",
    async () => {
      const response = await usersAPI.createAccount({
        ...user2,
        password: "password",
      });
      expect(response.status).toBe(400);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toBe(
        "Your password must be 8-20 characters long, at least one uppercase letter, one lowercase letter and one number."
      );
    },
    TIMEOUT
  );

  test(
    "400 - email missing",
    async () => {
      const response = await usersAPI.createAccount({
        ...user2,
        email: "",
      });
      expect(response.status).toBe(400);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toContain("Please provide a email!");
    },
    TIMEOUT
  );

  test(
    "400 - email invalid",
    async () => {
      const response = await usersAPI.createAccount({
        ...user2,
        email: "e!mail@mail.com",
      });
      expect(response.status).toBe(400);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toContain(
        `e!mail@mail.com is not a valid email!`
      );
    },
    TIMEOUT
  );

  test(
    "400 - name missing",
    async () => {
      const response = await usersAPI.createAccount({
        ...user2,
        name: "",
      });
      expect(response.status).toBe(400);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toContain("Please provide a name!");
    },
    TIMEOUT
  );

  test(
    "422 - username duplicated",
    async () => {
      const response = await usersAPI.createAccount({
        ...user2,
        username: user1.username,
      });
      expect(response.status).toBe(422);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toBe(
        `The username ${user1.username} or email ${user2.email} are already in use!`
      );
    },
    TIMEOUT
  );

  test(
    "422 - email duplicated",
    async () => {
      const response = await usersAPI.createAccount({
        ...user2,
        email: user1.email,
      });
      expect(response.status).toBe(422);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toBe(
        `The username ${user2.username} or email ${user1.email} are already in use!`
      );
    },
    TIMEOUT
  );
});

describe("log user", () => {
  test(
    "200 - user logged",
    async () => {
      const response = await usersAPI.logIntoAccount({
        username: user1.username,
        password: user1.password,
      });
      expect(response.status).toBe(200);
      expect(response.data.success).toBeTruthy();
      expect(response.data.authKey).toBeTruthy();
    },
    TIMEOUT
  );

  test(
    "400 - missing authentication fields (username & password)",
    async () => {
      const response = await usersAPI.logIntoAccount();
      expect(response.status).toBe(400);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toBe("Login with username and password!");
    },
    TIMEOUT
  );

  test(
    "400 - missing authentication fields (logging with email & password)",
    async () => {
      const response = await usersAPI.logIntoAccount({
        email: user1.email,
        password: user1.password,
      });
      expect(response.status).toBe(400);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toBe("Login with username and password!");
    },
    TIMEOUT
  );

  test(
    "400 - missing authentication fields (username)",
    async () => {
      const response = await usersAPI.logIntoAccount({
        password: user1.password,
      });
      expect(response.status).toBe(400);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toBe("Login with username and password!");
    },
    TIMEOUT
  );

  test(
    "400 - missing authentication fields (password)",
    async () => {
      const response = await usersAPI.logIntoAccount({
        username: user1.username,
      });
      expect(response.status).toBe(400);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toBe("Login with username and password!");
    },
    TIMEOUT
  );

  test(
    "401 - wrong password",
    async () => {
      const response = await usersAPI.logIntoAccount({
        username: user1.username,
        password: "123",
      });
      expect(response.status).toBe(401);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toBe("Invalid credentials!");
    },
    TIMEOUT
  );

  test(
    "404 - user not found",
    async () => {
      const response = await usersAPI.logIntoAccount({
        username: "random",
        password: "123",
      });
      expect(response.status).toBe(404);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toBe("User not found!");
    },
    TIMEOUT
  );
});

describe("reset password", () => {
  test(
    "200 - new password",
    async () => {
      const response = await usersAPI.resetPassword({
        username: user1.username,
        email: user1.email,
        newPassword: "NewPass123",
      });
      console.log(response);
      expect(response.status).toBe(200);
      expect(response.data.success).toBeTruthy();
      expect(response.data.message).toBe("Password updated!");
    },
    TIMEOUT
  );

  test(
    "400 - missing username, email and newPassword",
    async () => {
      const response = await usersAPI.resetPassword();
      expect(response.status).toBe(400);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toBe(
        "Please provide username, email and newPassword"
      );
    },
    TIMEOUT
  );

  test(
    "400 - missing username",
    async () => {
      const response = await usersAPI.resetPassword({
        email: user1.email,
        newPassword: "NewPass123",
      });
      expect(response.status).toBe(400);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toBe(
        "Please provide username, email and newPassword"
      );
    },
    TIMEOUT
  );

  test(
    "400 - missing email",
    async () => {
      const response = await usersAPI.resetPassword({
        username: user1.username,
        newPassword: "NewPass123",
      });
      expect(response.status).toBe(400);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toBe(
        "Please provide username, email and newPassword"
      );
    },
    TIMEOUT
  );

  test(
    "400 - missing newPassword",
    async () => {
      const response = await usersAPI.resetPassword({
        username: user1.username,
        email: user1.email,
      });
      expect(response.status).toBe(400);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toBe(
        "Please provide username, email and newPassword"
      );
    },
    TIMEOUT
  );

  test(
    "400 - invalid newPassword",
    async () => {
      const response = await usersAPI.resetPassword({
        username: user1.username,
        email: user1.email,
        newPassword: "password",
      });
      expect(response.status).toBe(400);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toBe(
        "Your password must be 8-20 characters long, at least one uppercase letter, one lowercase letter and one number."
      );
    },
    TIMEOUT
  );

  test(
    "404 - user not found",
    async () => {
      const response = await usersAPI.resetPassword({
        username: "someRandomUser",
        email: user1.email,
        newPassword: "Password123",
      });
      expect(response.status).toBe(404);
      expect(response.data.success).toBeFalsy();
      expect(response.data.error).toBe(
        `User with username someRandomUser and email ${user1.email} not found!`
      );
    },
    TIMEOUT
  );
});

beforeAll(async () => {
  await usersAPI.createAccount(user1);
});

afterAll(async () => {
  await usersDB.deleteOne(user1.username);
  await usersDB.deleteOne(user2.username); // temporary
});
