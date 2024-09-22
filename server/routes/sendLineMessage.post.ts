import axios from "axios";
interface Message {
  type: "text" | "location";
}
interface TextMessage extends Message {
  type: "text";
  text: string;
}
interface LocationMessage extends Message {
  type: "location";
  title: string;
  address: string;
  latitude: number;
  longitude: number;
}
const createGreetTextMessage = (pageTitle: string): TextMessage => {
  return {
    type: "text",
    text: `${pageTitle}のSOSページから連絡がありました！`,
  };
};
const createTextMessage = (message: string): TextMessage => {
  return {
    type: "text",
    text: message,
  };
};

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
  // TODO: 位置情報を取得する処理に置き換える
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
  console.log(messages);
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
