import axios from "axios";
interface Message {
  type: "text" | "location";
}
// LINEのテキストメッセージ
interface TextMessage extends Message {
  type: "text";
  text: string;
}
// LINEの位置情報メッセージ
interface LocationMessage extends Message {
  type: "location";
  title: string;
  address: string;
  latitude: number;
  longitude: number;
}
/*
  * 1通目のメッセージを作成する
  * @param pageTitle ページ名(ペットの名前)
  * @returns TextMessage LINEのテキストメッセージ
*/
const createGreetTextMessage = (pageTitle: string): TextMessage => {
  return {
    type: "text",
    text: `${pageTitle}のSOSページから連絡がありました！`,
  };
};
/*
  * 2通目のメッセージを作成する
  * @param message 送信者が入力したメッセージ
  * @returns TextMessage LINEのテキストメッセージ
*/
const createTextMessage = (message: string): TextMessage => {
  return {
    type: "text",
    text: message,
  };
};

/*
  * LINE Message APIにのリクエストボディを作成する
  * @param pageTitle ページのタイトル
  * @param message メッセージ
  * @param isIncludeLocation 位置情報を含むかどうか
  * @param latitude 緯度
  * @param longitude 経度
  * @returns Message[] LINE Message APIのリクエストボディ
*/
const createMessages = (
  pageTitle: string,
  message: string,
  isIncludeLocation: boolean,
  latitude: number,
  longitude: number
): Message[] => {
  const greetMassage: TextMessage = createGreetTextMessage(pageTitle);
  const contentMessage: TextMessage = createTextMessage(message);
  const messages: Message[] = [greetMassage, contentMessage];
  if (isIncludeLocation) {
    const locationMessage: LocationMessage = {
      type: "location",
      title: "メッセージ送信者の位置情報",
      address: "sample address",
      latitude: latitude,
      longitude: longitude,
    };
    messages.push(locationMessage);
  }
  return messages;
};

export default defineEventHandler(async (event) => {
  // 環境変数からトークンと宛先のユーザIDを取得
  const config = useRuntimeConfig();
  const uid = config.public.sendLineTargetUserid;
  const accessToken = config.public.petSosChannnelToken;

  const { pageTitle, message, isIncludeLocation, latitude, longitude } =
    await readBody(event);
  const messages: Message[] = createMessages(
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
