const axios = require("axios");
const { startServer } = require("../01-server");

let server, baseURL;

beforeAll(async () => {
  server = await startServer();
  baseURL = `http://localhost:${server.address().port}`;
});

afterAll(() => server.close());

describe("Run all node test cases", () => {
  it("run server test", async () => {
    let res = await axios(baseURL);
    expect("hi").toEqual(res?.data);
  });
});
