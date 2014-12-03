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
<!-- start Mixpanel --><script type="text/javascript">(function(f,b){if(!b.__SV){var a,e,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");
for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=f.createElement("script");a.type="text/javascript";a.async=!0;a.src="//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";e=f.getElementsByTagName("script")[0];e.parentNode.insertBefore(a,e)}})(document,window.mixpanel||[]);
mixpanel.init("YOUR TOKEN");</script><!-- end Mixpanel -->

<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js"></script>
<script type="text/javascript" src="//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"></script>
<script type="text/javascript" src="http://localhost/mixpanel/visual_editor.js"></script>
<script type="text/javascript">
new MixpanelVisualWeb("1ef7e30d2a58d27f4b90c42e31d6d7ad")
</script>