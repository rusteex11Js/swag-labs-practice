// data/index.js
import qaLoginData from "./qa/loginData.json" with { type: "json" };
import uatLoginData from "./uat/loginData.json" with { type: "json" };

const env = (process.env.ENV || "qa").toLowerCase();

const loginData = {
  qa: qaLoginData,
  uat: uatLoginData,
};

if (!loginData[env]) {
  throw new Error(`Invalid ENV: ${env}`);
}

export default loginData[env];