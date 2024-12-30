import { fetchWrap } from "@ch-tools/fetch";

try {
  fetchWrap('/api', {}).then((res) => {
    console.log(res);
  });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {
  // error.help;
}
