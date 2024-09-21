<template>
  <div class="profile-container">
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
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>LINE経由でメッセージを送信</h2>
        <aside>
          <p>
            ※LINEBotを通じて飼い主にメッセージが送られますので、送信者様のLINEアカウントの情報は使用されません。
          </p>
        </aside>
        <textarea
          v-model="message"
          placeholder="メッセージを入力してください"
        ></textarea>
        <label>
          <input type="checkbox" v-model="includeLocation" /> 現在地情報を送信しても問題ない場合はチェックしてください
        </label>
        <div class="modal-buttons">
          <button class="send-button" @click="sendMessage">送信</button>
          <button class="cancel-button" @click="closeModal">キャンセル</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showModal = ref(false);
const message = ref("");
const includeLocation = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const sendMessage = () => {
  if (!message.value) {
    alert("メッセージを入力してください");
    return;
  }
  alert(`送信完了しました！ メッセージ: ${message.value} 現在地情報: ${includeLocation.value}`);
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
.modal-content p{
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
