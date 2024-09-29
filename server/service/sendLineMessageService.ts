import type {
  LocationMessage,
  Message,
  TextMessage,
} from "@/server/routes/sendLineMessage.post";

export default class SendLineMessageService {
  /**
   * 1通目のメッセージを作成する
   * @param pageTitle ページ名(ペットの名前)
   * @returns TextMessage LINEのテキストメッセージ
   */
  private createGreetTextMessage = (pageTitle: string): TextMessage => {
    return {
      type: "text",
      text: `${pageTitle}のSOSページから連絡がありました！`,
    };
  };
  /**
   * 2通目のメッセージを作成する
   * @param message 送信者が入力したメッセージ
   * @returns TextMessage LINEのテキストメッセージ
   */
  private createTextMessage = (message: string): TextMessage => {
    return {
      type: "text",
      text: message,
    };
  };
  /**
   * LINE Message APIにのリクエストボディを作成する
   * @param pageTitle ページのタイトル
   * @param message メッセージ
   * @param isIncludeLocation 位置情報を含むかどうか
   * @param latitude 緯度
   * @param longitude 経度
   * @returns Message[] LINE Message APIのリクエストボディ
   */
  public createMessages = (
    pageTitle: string,
    message: string,
    isIncludeLocation: boolean,
    latitude?: number,
    longitude?: number
  ): Message[] => {
    const greetMassage: TextMessage = this.createGreetTextMessage(pageTitle);
    const contentMessage: TextMessage = this.createTextMessage(message);
    const messages: Message[] = [greetMassage, contentMessage];
    if (isIncludeLocation) {
      if (!latitude || !longitude) {
        throw new Error("緯度経度が取得できていません。");
      }
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
}
