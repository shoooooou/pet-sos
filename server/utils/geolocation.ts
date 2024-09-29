/** 
 * 現在位置の緯度経度を取得する
 * @returns {Promise<{latitude: number, longitude: number}>} 緯度経度
*/
export const getCurrentLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        }
      );
    }
  });
};
