<?php

function guest_layout($data)
{ ?>
 <!DOCTYPE html>
 <html lang="en">

 <head>
  <meta charset="utf-8">
  <title>Intaxing</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

  <script src="/src/bootstrap.js">

  </script>
 </head>

 <body>
  <div id="app">
   <?php call_user_func_array(['self', 'header_page'], [false]);
   ?>
   <div class="container">
    <h1 class="my-5"> Welcome Home</h1>
   </div>
   <div class="grow flex flex-col">
    <?php //call_user_func($data['body']['call'], $data['body']['value']) 
    ?>
   </div>
   <footer>
   </footer>
  </div>
  <script type="module" src="/src/vue.js">

  </script>
 </body>

 </html>
<?php } ?>