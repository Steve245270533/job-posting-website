export default defineTask({
  meta: {
    name: "console",
    description: "Run console commands",
  },
  async run({ payload, context }) {
    console.log("[Task] Run console commands")
    return { result: "Success" };
  },
});