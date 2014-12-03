<div>Place the following code on <?php echo $_GET['url']; ?> inside your &lt;head&gt;&lt;/head&gt; tags:</div>
<textarea rows="3" cols="100">
<script type="text/javascript" src="https://s3-us-west-1.amazonaws.com/mixpanelweb/mpweb.js"></script>
<script type="text/javascript">mixpanelweb.init("<?php echo $_GET['token']; ?>");</script>
</textarea>