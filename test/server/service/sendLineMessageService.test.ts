import SendLineMessageService from "@/server/service/sendLineMessageService";
import { beforeAll, describe, expect, it } from "vitest";
import type { LocationMessage, TextMessage } from "~/types/lineMessages";

describe("SendLineMessageService", () => {
  let service: SendLineMessageService;

  beforeAll(() => {
    service = new SendLineMessageService();
  });

  it("createGreetTextMessage 正常系", () => {
    const pageTitle = "ポチ";
    const expectedMessage: TextMessage = {
      type: "text",
      text: "ポチのSOSページから連絡がありました！",
    };
    // @ts-ignore: Testing private method
    const result = service.createGreetTextMessage(pageTitle);
    expect(result).toEqual(expectedMessage);
  });
  it("createTextMessage 正常系", () => {
    const message = "テスト用てきすと1234@?!+*";
    const expectedMessage: TextMessage = {
      type: "text",
      text: `${message}のSOSページから連絡がありました！`,
    };
    // @ts-ignore: Testing private method
    const result = service.createGreetTextMessage(message);
    expect(result).toEqual(expectedMessage);
  });
  it("createMessages 正常系 位置情報送信", () => {
    const pageTitle: string = "ポチ";
    const message: string = "テスト用てきすと1234@?!+*";
    const isIncludeLocation: boolean = true;
    const latitude: number = 35.681236;
    const longitude: number = 139.767125;
    const expectedMessage: (TextMessage | LocationMessage)[] = [
      {
        type: "text",
        text: `${pageTitle}のSOSページから連絡がありました！`,
      },
      {
        type: "text",
        text: message,
      },
      {
        type: "location",
        title: "メッセージ送信者の位置情報",
        address: "sample address",
        latitude: 35.681236,
        longitude: 139.767125,
      },
    ];
    // @ts-ignore: Testing private method
    const result = service.createMessages(
      pageTitle,
      message,
      isIncludeLocation,
      latitude,
      longitude
    );
    expect(result).toEqual(expectedMessage);
  });
  it("createMessages 正常系 位置情報未送信", () => {
    const pageTitle: string = "ポチ";
    const message: string = "テスト用てきすと1234@?!+*";
    const isIncludeLocation: boolean = false;
    let latitude: undefined;
    let longitude: undefined;
    const expectedMessage: (TextMessage | LocationMessage)[] = [
      {
        type: "text",
        text: `${pageTitle}のSOSページから連絡がありました！`,
      },
      {
        type: "text",
        text: message,
      },
    ];
    // @ts-ignore: Testing private method
    const result = service.createMessages(
      pageTitle,
      message,
      isIncludeLocation,
      latitude,
      longitude
    );
    expect(result).toEqual(expectedMessage);
  });
  it("createMessages 異常系 位置情報送信で緯度経度の値がない", () => {
    const pageTitle: string = "ポチ";
    const message: string = "テスト用てきすと1234@?!+*";
    const isIncludeLocation: boolean = true;
    let latitude: undefined;
    let longitude: undefined;

    // @ts-ignore: Testing private method
    expect(() => {
      service.createMessages(
        pageTitle,
        message,
        isIncludeLocation,
        latitude,
        longitude
      );
    }).toThrowError("緯度経度が取得できていません。");
  });
});
