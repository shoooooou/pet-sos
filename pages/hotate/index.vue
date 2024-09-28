<template>
  <div class="profile-container">
    <!-- TODO: コンポーネント化 -->
    <!-- TODO: v-forで実装できるようにする -->
    <div class="photo-section">
      <div class="slider">
        <img
          src="@/assets/dummy/dummy_1.jpg"
          alt="迷子犬の写真"
          class="dog-photo"
        />
        <img
          src="@/assets/dummy/dummy_2.jpg"
          alt="迷子犬の写真"
          class="dog-photo"
        />
        <img
          src="@/assets/dummy/dummy_3.jpg"
          alt="迷子犬の写真"
          class="dog-photo"
        />
      </div>
      <h1 class="dog-name">名前: hoge</h1>
    </div>
    <div class="details-section">
      <p><strong>年齢:</strong> 3歳</p>
      <p><strong>性別:</strong> オス</p>
      <p><strong>種類:</strong> ポメラニアン</p>
      <p><strong>特徴:</strong> 頭の後ろの毛色がクリーム</p>
    </div>

    <div class="contact-section">
      <h2>QRコードからアクセスしてくださった方</h2>
      <p>
        <strong
          >LINE送信ボタンからテキストを入力して送信すると飼い主へメッセージを送れます。</strong
        >
      </p>
      <button class="line-button" @click="openModal">LINE送信</button>
      <p><strong>飼い主への連絡先:</strong> sample@gmail.com</p>
    </div>

    <!-- Modal -->
    <!-- TODO: コンポーネント化 -->
    <div class="modal" v-if="showSendLineModal">
      <div class="modal-content">
        <span class="close" @click="closeSendLineModal">&times;</span>
        <h2>LINE経由でメッセージを送信</h2>
        <aside>
          <p>
            ※LINEBotを通じて飼い主にメッセージが送られますので、送信者様のLINEアカウントの情報は使用されません。
          </p>
        </aside>
        <textarea
          v-model="message"
          placeholder="お伝えできる連絡先を提示していただけますと幸いです！"
        ></textarea>
        <label>
          <input type="checkbox" v-model="isIncludeLocation" />
          現在地情報を送信しても問題ない場合はチェックしてください
        </label>
        <div class="modal-buttons">
          <button class="send-button" @click="sendMessage">送信</button>
          <button class="cancel-button" @click="closeSendLineModal">
            キャンセル
          </button>
        </div>
      </div>
    </div>
    <div class="modal" v-if="showIsSendLineModal">
      <div class="modal-content">
        <span class="close" @click="closeIsSendLineModal">&times;</span>
        <h2>{{ isSendLineText.title }}</h2>
        <p>{{ isSendLineText.content }}</p>
        <div class="modal-buttons">
          <button class="cancel-button" @click="closeIsSendLineModal">
            閉じる
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { getCurrentLocation } from "@/server/utils/geolocation";

interface isSendLineText {
  title: string;
  content: string;
}

const showSendLineModal = ref(false);
const showIsSendLineModal = ref(false);
const message = ref("");
const isIncludeLocation = ref(false);
const isSendLineText = ref<isSendLineText>({ title: "", content: "" });

const openModal = () => {
  showSendLineModal.value = true;
};

const closeSendLineModal = () => {
  showSendLineModal.value = false;
};

const closeIsSendLineModal = () => {
  showIsSendLineModal.value = false;
};

const sendMessage = async () => {
  if (!message.value) {
    alert("メッセージを入力してください");
    return;
  }
  let latitude: number | null = null;
  let longitude: number | null = null;
  if (isIncludeLocation.value) {
    const location = await getCurrentLocation();
    console.log(`現在地情報: ${location.latitude}, ${location.longitude}`);
    latitude = location.latitude;
    longitude = location.longitude;
  }
  try {
    await axios.post("/sendLineMessage", {
      pageTitle: "ほたて",
      message: message.value,
      isIncludeLocation: isIncludeLocation.value,
      latitude: isIncludeLocation.value ? latitude : null,
      longitude: isIncludeLocation.value ? longitude : null,
    });
    isSendLineText.value = {
      title: "送信完了",
      content: "飼い主へLINEメッセージを送信しました！",
    };
  } catch (e) {
    isSendLineText.value = {
      title: "送信失敗",
      content: "飼い主へLINEメッセージが送れませんでした！",
    };
  }finally{
    showSendLineModal.value = false;
    showIsSendLineModal.value = true;
    message.value = "";
    isIncludeLocation.value = false;
  }
};
</script>

<style>
/* ...existing styles... */
.slider {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}

.dog-photo {
  width: 100%;
  border-radius: 10px;
  scroll-snap-align: start;
}

body {
  font-family: "Roboto", sans-serif;
  background-color: #f0f8ff;
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.profile-container {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  padding: 20px;
  text-align: center;
}

.photo-section {
  margin-bottom: 20px;
}

.dog-photo {
  width: 100%;
  border-radius: 10px;
}

.dog-name {
  font-size: 24px;
  color: #333;
}

.details-section {
  margin-bottom: 20px;
  text-align: left;
}

.details-section p {
  margin: 5px 0;
}

.contact-section {
  background-color: #e6ffff;
  padding: 15px;
  border-radius: 5px;
}

.contact-section h2 {
  margin-bottom: 10px;
  font-size: 20px;
}

.contact-section p {
  margin: 5px 0;
}

/* Media queries for responsiveness */
@media (max-width: 600px) {
  .profile-container {
    width: 100%;
    max-width: 400px;
  }
}
.line-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}
/* Modal styles */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
  border-radius: 5px;
}
.modal-content p {
  font-size: 12px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
}

.send-button,
.cancel-button {
  margin-left: 10px;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.send-button {
  background-color: #4caf50;
  color: white;
  border: none;
}

.cancel-button {
  background-color: #ccc;
  color: black;
  border: none;
}
</style>
