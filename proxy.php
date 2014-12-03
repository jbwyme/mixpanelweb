<?php
error_reporting(E_ALL^E_NOTICE);

$url = $_GET['url'];
$parse = parse_url($url);
$domain = array_key_exists('domain', $parse) ? $parse['domain'] : $parse['host'];
$domain = "//" . $domain;
$txt = file_get_contents($url);
$txt = preg_replace("/(href|src)\=\"([^(http|\/)])(\/)?/", "$1=\"$domain$2", $txt);
echo $txt; 
?>
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js"></script>
<script type="text/javascript" src="//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"></script>
<script type="text/javascript" src="http://localhost/mixpanel/visual_editor.js"></script>
<script type="text/javascript">
new MixpanelVisualWeb("1ef7e30d2a58d27f4b90c42e31d6d7ad")
</script>