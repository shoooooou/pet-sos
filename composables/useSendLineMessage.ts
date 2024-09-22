export const useSendLineMessage = async () => {
  const accessToken = "fqKp9Fb4lZ68I/pSgFx5wN2HhJwk+yPaAXq024Jynmr45hKXOx9i6pg5QY6CFAdHrsqn6d9ZC8gxMb/d8Ipp/xV5MT8cTjJWi+yoWYb/ZUt6h448EneOL/OkMI9KbxqIneE3DwO72uaC9NVsgx+IzgdB04t89/1O/w1cDnyilFU="
  const Uid = "Uee28fac465372362bcbd224a630f0d89"
  await useFetch("https://api.line.me/v2/bot/message/push",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      to: Uid,
      messages: [
        {
          type: "text",
          text: "Hello, World!"
        }
      ]
    })
  })
}
