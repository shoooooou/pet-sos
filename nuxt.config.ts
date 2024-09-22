// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      petSosChannnelToken: process.env.PET_SOS_CHANNEL_TOKEN,
      sendLineTargetUserid: process.env.SEND_LINE_TARGET_USERID,
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
});
