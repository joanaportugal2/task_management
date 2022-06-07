const dbUsers = require("../../__calls__/db/users");
const TIMEOUT = 7000;

const user = {
  username: "uniqueUsername",
  password: "password",
  email: "someone@gmail.com",
  name: "John Doe",
};

describe("create one user", () => {
  test(
    "create unique user without errors - result should contain user object",
    async () => {
      const result = await dbUsers.createOne(user);
      expect(result).toBeTruthy();
      expect(result).toMatchObject(user);
    },
    TIMEOUT
  );

  test(
    "create user with errors - username missing",
    async () => {
      const result = await dbUsers.createOne({ ...user, username: "" });
      expect(result.name).toBe("ValidationError");
      expect(result.errors.username.message).toBe("Please provide a username!");
    },
    TIMEOUT
  );

  test(
    "create user with errors - username duplicated",
    async () => {
      const result = await dbUsers.createOne(user);
      expect(result.name).toBe("MongoServerError");
      expect(result.code).toBe(11000);
    },
    TIMEOUT
  );

  test(
    "create user with errors - username invalid by characters",
    async () => {
      const result = await dbUsers.createOne({
        ...user,
        username: "i'mInvalid",
      });
      expect(result.name).toBe("ValidationError");
      expect(result.errors.username.message).toBe(
        "i'mInvalid is not a valid username!"
      );
    },
    TIMEOUT
  );

  test(
    "create user with errors - username invalid by number of characters",
    async () => {
      const result = await dbUsers.createOne({
        ...user,
        username: "ihavetoomanycharacterstobeaccepted",
      });
      expect(result.name).toBe("ValidationError");
      expect(result.errors.username.message).toBe(
        "Username should have between 4 and 16 characters!"
      );
    },
    TIMEOUT
  );

  test(
    "create user with errors - password missing",
    async () => {
      const result = await dbUsers.createOne({ ...user, password: "" });
      expect(result.name).toBe("ValidationError");
      expect(result.errors.password.message).toBe("Please provide a password!");
    },
    TIMEOUT
  );

  test(
    "create user with errors - email missing",
    async () => {
      const result = await dbUsers.createOne({ ...user, email: "" });
      expect(result.name).toBe("ValidationError");
      expect(result.errors.email.message).toBe("Please provide a email!");
    },
    TIMEOUT
  );

  test(
    "create user with errors - email duplicated",
    async () => {
      const result = await dbUsers.createOne(user);
      expect(result.name).toBe("MongoServerError");
      expect(result.code).toBe(11000);
    },
    TIMEOUT
  );

  test(
    "create user with errors - email invalid",
    async () => {
      const result = await dbUsers.createOne({
        ...user,
        email: "invalid@email",
      });
      expect(result.name).toBe("ValidationError");
      expect(result.errors.email.message).toBe(
        "invalid@email is not a valid email!"
      );
    },
    TIMEOUT
  );

  test(
    "create user with errors - name missing",
    async () => {
      const result = await dbUsers.createOne({ ...user, name: "" });
      expect(result.name).toBe("ValidationError");
      expect(result.errors.name.message).toBe("Please provide a name!");
    },
    TIMEOUT
  );

  test(
    "create user with errors - invalid avatar",
    async () => {
      const result = await dbUsers.createOne({
        ...user,
        avatar: "www.someUrl/png",
      });
      expect(result.name).toBe("ValidationError");
      expect(result.errors.avatar.message).toBe(
        "www.someUrl/png is not a valid avatar image!"
      );
    },
    TIMEOUT
  );
});

describe("read all users", () => {
  test(
    "all users should have username",
    async () => {
      const result = await dbUsers.readAll();
      expect(result.every((user) => user.username)).toBeTruthy();
    },
    TIMEOUT
  );

  test(
    "all users should have password",
    async () => {
      const result = await dbUsers.readAll();
      expect(result.every((user) => user.password)).toBeTruthy();
    },
    TIMEOUT
  );

  test(
    "all users should have email",
    async () => {
      const result = await dbUsers.readAll();
      expect(result.every((user) => user.email)).toBeTruthy();
    },
    TIMEOUT
  );

  test(
    "all users should have name",
    async () => {
      const result = await dbUsers.readAll();
      expect(result.every((user) => user.name)).toBeTruthy();
    },
    TIMEOUT
  );

  test(
    "all users should have avatar",
    async () => {
      const result = await dbUsers.readAll();
      expect(result.every((user) => user.avatar)).toBeTruthy();
    },
    TIMEOUT
  );
});

describe("read one user", () => {
  test(
    "read test user and check properties",
    async () => {
      const result = await dbUsers.readOne(user.username);
      expect(result).toBeTruthy();
      expect(result).toMatchObject(user);
    },
    TIMEOUT
  );

  test(
    "read unexistent user",
    async () => {
      const result = await dbUsers.readOne("thisUserShouldNotExist");
      expect(result).toBeFalsy();
    },
    TIMEOUT
  );
});

describe("update one user", () => {
  test(
    "updated test user and read to check if value was changed",
    async () => {
      const result = await dbUsers.updateOne(user.username, {
        password: "new",
      });
      expect(result).toBeTruthy();
      const result2 = await dbUsers.readOne(user.username);
      expect(result2.password).toBe("new");
    },
    TIMEOUT
  );

  test(
    "update unexistent user",
    async () => {
      const result = await dbUsers.updateOne("thisUserShouldNotExist", {
        password: "new",
      });
      expect(result).toBeFalsy();
    },
    TIMEOUT
  );
});

describe("delete one user", () => {
  test(
    "delete test user and read to check if it was deleted",
    async () => {
      const result = await dbUsers.deleteOne(user.username);
      expect(result).toBeTruthy();
      const result2 = await dbUsers.readOne("thisUserShouldNotExist");
      expect(result2).toBeFalsy();
    },
    TIMEOUT
  );

  test(
    "delete unexistent user",
    async () => {
      const result = await dbUsers.deleteOne("thisUserShouldNotExist");
      expect(result).toBeFalsy();
    },
    TIMEOUT
  );
});
