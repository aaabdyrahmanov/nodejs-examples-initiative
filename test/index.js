const tape = require("tape");
const bent = require("bent");
const semver = require("semver");
const getPort = require("get-port");
const getHost = require("get-host");

const server = require("../server");

const getBuffer = bent("buffer");

const context = {};

tape("setup", async (t) => {
  const PORT = await getPort();
  const HOST = await getHost();
  context.server = server.listen(PORT);
  context.origin = `http://${HOST}:${PORT}`;

  t.end();
});

tape("should get existing required dependencies", async (t) => {
  const html = (await getBuffer(`${context.origin}/dependencies`)).toString();
  t.plan(3);

  t.equal(
    html.includes("express"),
    true,
    "# Should contain package - ^express"
  );
  t.equal(html.includes("bent"), true, "# Should contain package - ^bent");
  t.equal(html.includes("hbs"), true, "# Should contain package - ^hbs");
});

tape("should get minimum secure versions", async (t) => {
  const getStream = bent(context.origin);
  const stream = await getStream("/minimum-secure");
  t.plan(3);

  const versions = await stream.json();
  const zeroesVersion = versions.filter(
    (v) => semver.major(v.version) === 0
  )[0];
  const forthVersion = versions.filter((v) => semver.major(v.version) === 4)[0];
  t.equal(stream.status, 200, "# should get the data successfully");
  t.equal(zeroesVersion.version, "v0.12.17", "# v0 version should match");
  t.equal(forthVersion.version, "v4.9.0", "# v4 version should match");
});

tape("should get latest-releases", async (t) => {
  const getStream = bent(context.origin);
  const stream = await getStream("/latest-releases");
  t.plan(3);

  const versions = await stream.json();
  const thirteenthVersion = versions.filter(
    (v) => semver.major(v.version) === 13
  )[0];
  const fourteenthVersion = versions.filter(
    (v) => semver.major(v.version) === 14
  )[0];
  t.equal(stream.status, 200, "# should get the data successfully");
  t.equal(thirteenthVersion.version, "v13.14.0", "# v13 version should match");
  t.equal(fourteenthVersion.version, "v14.10.1", "# v14 version should match");
});

tape("teardown", (t) => {
  context.server.close();
  t.end();
});
