const zod = require("zod");

const userZod = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

const updateUser = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});

const addHistory =zod.object({
  personName: zod.string(),
  userId: zod.string(),
  toId:zod.string(),
  amount:zod.number(),
  addedToAccount:zod.boolean(),
})

module.exports = {
  userZod,
  updateUser,
};
