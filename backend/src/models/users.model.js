module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, "Please provide a username!"],
        unique: true,
        validate: [
          {
            validator: function (v) {
              return /^[a-zA-Z0-9\_]+$/.test(v); // valid only a-z, A-Z, 0-9 and _ characters
            },
            message: (props) => `${props.value} is not a valid username!`,
          },
          {
            validator: function (v) {
              return v.length >= 4 && v.length <= 16;
            },
            message: "Username should have between 4 and 16 characters!",
          },
        ],
      },
      password: {
        type: String,
        required: [true, "Please provide a password!"],
      },
      email: {
        type: String,
        required: [true, "Please provide a email!"],
        unique: true,
        validate: {
          validator: function (v) {
            return /^[\a-zA-Z0-9\_\.]+@([\a-z]+\.)+[\a-z]{2,4}$/.test(v);
            // a-z, A-Z, 0-9, _ or . characters @ a-z characters . a-z characters (2-4)
          },
          message: (props) => `${props.value} is not a valid email!`,
        },
      },
      name: { type: String, required: [true, "Please provide a name!"] },
      avatar: {
        type: String,
        default:
          "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
        validate: {
          validator: function (v) {
            return /(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/.test(v);
          },
          message: (props) => `${props.value} is not a valid avatar image!`,
        },
      },
    },
    { timestamps: false, versionKey: false }
  );

  const User = mongoose.model("users", schema);
  return User;
};
