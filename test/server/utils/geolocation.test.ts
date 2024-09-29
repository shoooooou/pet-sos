import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentLocation } from "@/server/utils/geolocation";

describe("geolocation", () => {
  let originalGeolocation: Geolocation | undefined;

  beforeAll(() => {
    // 元の navigator.geolocation を保存
    originalGeolocation = navigator.geolocation;
  });

  afterEach(() => {
    // navigator.geolocation を元に戻す
    Object.defineProperty(global.navigator, "geolocation", {
      value: originalGeolocation,
      configurable: true,  // 再定義可能に設定
    });
    vi.resetAllMocks();  // モックのリセット
  });

  it("getCurrentLocation 正常系", async () => {
    const mockPosition = {
      coords: {
        latitude: 35.681236,
        longitude: 139.767125,
      },
    };
    
    const mockGeolocation = {
      getCurrentPosition: vi.fn((success) => {
        success(mockPosition);
      }),
    };

    Object.defineProperty(global.navigator, "geolocation", {
      value: mockGeolocation,
      configurable: true,  // 再定義可能に設定
    });

    const result = await getCurrentLocation();
    expect(result).toEqual({
      latitude: mockPosition.coords.latitude,
      longitude: mockPosition.coords.longitude,
    });
  });

  it("getCurrentLocation 異常系 ブラウザにnavigator.geolocationが存在しない", async () => {
    const expectedErrorMessage = "Geolocation is not supported by your browser.";
    
    Object.defineProperty(global.navigator, "geolocation", {
      value: undefined,
      configurable: true,  // 再定義可能に設定
    });

    await expect(getCurrentLocation()).rejects.toThrowError(expectedErrorMessage);
  });

  it("getCurrentLocation 異常系 位置情報取得APIからエラーが返ってくる", async () => {
    const expectedErrorMessage = "Geolocation error: User denied Geolocation";

    const mockGeolocation = {
      getCurrentPosition: vi.fn((_, error) => {
        error({ message: "User denied Geolocation" });
      }),
    };

    Object.defineProperty(global.navigator, "geolocation", {
      value: mockGeolocation,
      configurable: true,  // 再定義可能に設定
    });

    await expect(getCurrentLocation()).rejects.toThrowError(expectedErrorMessage);
  });
});
