import WebApp from "@twa-dev/sdk";

export const getTmaUserInfo = (): { id: string | null } => {
  try {
    const params = new URLSearchParams(WebApp.initData);
    const userJSON = params.get("user");
    if (userJSON) {
      const user = JSON.parse(decodeURIComponent(userJSON));
      return { id: user.id?.toString() };
    }
    console.warn("User JSON not found in WebApp.initData");
  } catch (e) {
    console.error("Error getting user info:", e);
  }
  return { id: null };
};
