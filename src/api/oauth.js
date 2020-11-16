import gh_api from "./../../../xxxx_gh-api/packages/index";

const tokenKey = "github-oauth-token";

export const sign_in = ({ code }) => {
  gh_api("GET /login/oauth/authorize", {
    params: {
      client_id: `381a344cb2b73d11f5e7`,
      client_secret: `d06a25df6214b2af161a9b35a1a9d3633b5d7b20`,
      code,
    },
    headers: { accept: "application/json" },
  }).then((res) => {
    console.log(res);
  });
  return window.axios({
    url:
      "/github/login/oauth/access_token?" +
      `client_id=381a344cb2b73d11f5e7&` +
      `client_secret=d06a25df6214b2af161a9b35a1a9d3633b5d7b20&` +
      `code=${code}`,
    method: "post",
    headers: { accept: "application/json" },
  });
};

export const set_token = (token) =>
  localStorage.setItem(tokenKey, JSON.stringify(token));

export const get_token = () => JSON.parse(localStorage.getItem(tokenKey));

export const delete_token = () => localStorage.removeItem(tokenKey);
