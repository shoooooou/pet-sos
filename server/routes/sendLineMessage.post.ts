import axios from "axios";
export default defineEventHandler(async (event) => {
  const config =  useRuntimeConfig();
  const Uid = config.public.sendLineTargetUserid
  const accessToken = config.public.petSosChannnelToken
  const response = await axios.post(
    "https://api.line.me/v2/bot/message/push",
    {
      to: Uid,
      messages: [
        {
          type: "text",
          text: "Hello, World!",
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
});
