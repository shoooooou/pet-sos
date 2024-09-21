<template>
  <div class="profile-container">
    <div class="photo-section">
      <div class="slider">
        {{ imgSrc }}
        <img src="@/assets/dummy/dummy_1.jpg" alt="迷子犬の写真" class="dog-photo" />
        <img src="@/assets/dummy/dummy_2.jpg" alt="迷子犬の写真" class="dog-photo" />
        <img src="@/assets/dummy/dummy_3.jpg" alt="迷子犬の写真" class="dog-photo" />
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
      <p><strong>飼い主への連絡先:</strong> sample@gmail.com</p>
    </div>
  </div>
</template>
<script setup lang="ts">


</script>
<style>
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
  background-color: #e6f7ff;
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
</style>
