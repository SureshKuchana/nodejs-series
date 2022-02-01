const axios = require("axios");
const { startServer } = require("../01-server");
const { startServer2 } = require("../02-server");
const { startServer3 } = require("../03-server");

let server, baseURL;

beforeAll(async () => {
  // change the server import accordingly the files
  server = await startServer3();
  baseURL = `http://localhost:${server.address().port}`;
});

afterAll(() => server.close());
describe("Run all node test cases", () => {
  it.skip("run 01-server test", async () => {
    let res1 = await axios(baseURL);
    expect("hi").toEqual(res1?.data);
  });
  it.skip("run 02-server test", async () => {
    let res2 = await axios(baseURL);
    expect(JSON.parse('{"text":"hi","numbers":[1,2,3]}')).toEqual(
      JSON.parse(JSON.stringify(res2?.data))
    );
  });
  describe("run 03-server test", () => {
    it("run 03-server baseUrl", async () => {
      let resRoot = await axios(baseURL);
      expect("hi").toEqual(resRoot?.data);
    });
    it("run 03-server baseUrl with json", async () => {
      let resRootJSON = await axios(baseURL + "/json");
      expect(JSON.parse('{"text":"hi","numbers":[1,2,3]}')).toEqual(
        JSON.parse(JSON.stringify(resRootJSON?.data))
      );
    });
    it("run 03-server baseUrl with not found", async () => {
      let resRootNotFound = await axios(baseURL + "/abc");
      expect("Not Found").toEqual(resRootNotFound?.data);
    });
  });
});
