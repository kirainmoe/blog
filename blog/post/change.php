<?php
    function str_replace_once($needle, $replace, $haystack) {
        $pos = strpos($haystack, $needle);
        if ($pos === false) {
            return $haystack;
        }
        return substr_replace($haystack, $replace, $pos, strlen($needle));
    }

$files = scandir(dirname(__FILE__));

foreach ($files as $value) {
    if ($value == '.' || $value == '..' || $value == 'change.php') {
        continue;
    } else {
        $f = fopen($value, "r");
        $content = fread($f, filesize($value));
        $res = str_replace_once("---", "---\ndraft: false", $content);
        $fw = fopen($value, "w");
        fwrite($fw, $res);
        fclose($f);
        fclose($fw);
    }
}