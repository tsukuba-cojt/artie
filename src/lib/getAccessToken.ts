import { GoogleAuth } from "google-auth-library";

export const getAccessToken = async () => {
  const auth = new GoogleAuth({
    credentials: JSON.parse(
      process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || "{}",
    ),
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  return accessToken.token;
};
