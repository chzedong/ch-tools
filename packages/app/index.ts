import { fetchWrap } from "@ch-tools/fetch";

try {
  fetchWrap("/api", {}).then((res) => {
    console.log(res);
  });
} catch (error) {
  // error.help;
}
