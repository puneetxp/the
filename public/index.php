<?php
require_once __DIR__ . '/../env.php';
?>
<!DOCTYPE html>
<html>

<head>
  <title>Vue.js 3 Routing From Scratch Using Vue Router With Pinia CDN</title>
  <link href="/cdn/css/bootstrap.css" rel="stylesheet" />
</head>
<body>
  <div id="app">
    <router-view />
  </div>
</body>
<script type="module">
  import { createApp } from "/cdn/js/vue.js";
  import { createPinia } from '/js/vue/pinia.js';
  import { loginstatusService } from "/js/vue/Service/Login.js";
  loginstatusService();
  import router from "/js/vue/router.js";
  createApp().use(router).use(createPinia()).mount("#app");
</script>
<script src="/cdn/js/bootstrap.js"></script>
</html>