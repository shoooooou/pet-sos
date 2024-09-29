/**
 * LINEメッセージ
 * {@label Message}
 * @public
 */
export interface Message {
  /** メッセージタイプ */
  type: "text" | "location";
}
/**
 * LINEテキストメッセージ
 * {@label TextMessage}
 * @public
 */
export interface TextMessage extends Message {
  /** メッセージタイプ */
  type: "text";
  /** テキスト */
  text: string;
}
/**
 * LINE位置情報メッセージ
 * {@label LocationMessage}
 * @public
 */
export interface LocationMessage extends Message {
  /** メッセージタイプ */
  type: "location";
  /** タイトル */
  title: string;
  /** 住所 */
  address: string;
  /** 緯度 */
  latitude: number;
  /** 経度 */
  longitude: number;
}
