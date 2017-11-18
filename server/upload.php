<?php
foreach($_FILES as $x=>$x_value) {
  echo "Key=" . $x . ", Value=" . $x_value;
  echo "<br>";
}
if ($_FILES["未标题-1_jpg"]["error"] > 0)
  {
  echo "Error: " . $_FILES["未标题-1_jpg"]["error"] . "<br />";
  }
else
  {
  echo "Upload: " . $_FILES["未标题-1_jpg"]["name"] . "<br />";
  echo "Type: " . $_FILES["未标题-1_jpg"]["type"] . "<br />";
  echo "Size: " . ($_FILES["未标题-1_jpg"]["size"] / 1024) . " Kb<br />";
  echo "Stored in: " . $_FILES["未标题-1_jpg"]["tmp_name"];
  }
?>