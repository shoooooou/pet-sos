import axios from "axios";
import SendLineMessageService from "../service/sendLineMessageService";
export interface Message {
  type: "text" | "location";
}
// LINEのテキストメッセージ
export interface TextMessage extends Message {
  type: "text";
  text: string;
}
// LINEの位置情報メッセージ
export interface LocationMessage extends Message {
  type: "location";
  title: string;
  address: string;
  latitude: number;
  longitude: number;
}
const sendLineMessageService = new SendLineMessageService();

export default defineEventHandler(async (event) => {
  // 環境変数からトークンと宛先のユーザIDを取得
  const config = useRuntimeConfig();
  const uid = config.public.sendLineTargetUserid;
  const accessToken = config.public.petSosChannnelToken;

  const { pageTitle, message, isIncludeLocation, latitude, longitude } =
    await readBody(event);
  const messages: Message[] = sendLineMessageService.createMessages(
    pageTitle,
    message,
    isIncludeLocation,
    latitude,
    longitude
  );
  // console.log(messages);
  const response = await axios.post(
    "https://api.line.me/v2/bot/message/push",
    {
      to: uid,
      messages: messages,
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
