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
  <link rel="stylesheet" href="output.css" />
 </head>
 <body class="mat-typography">
  <div class="flex flex-col min-h-screen">
   <div class="flex min-h-screen flex-col">
    <nav class="z-10 sticky top-0">
    </nav>
    <div class="grow flex flex-col">
     <?php //call_user_func($data['body']['call'], $data['body']['value']) ?>
    </div>
    <footer>
    </footer>
   </div>
  </div>
 </body>

 </html>
<?php } ?>