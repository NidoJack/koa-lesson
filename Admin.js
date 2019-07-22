module.exports = () => {
  return async (ctx, next) => {
    console.log(ctx.state);
    if (ctx.state.user.username === "admin") {
      next();
    } else {
      ctx.body = {
        code: -1,
        message: "Authentication Error"
      };
    }
  };
};
