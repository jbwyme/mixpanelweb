<style type="text/css">
	.toolbar {
		height: 20px;
		background: #54AD68;
		color: #fff;
		padding: 10px;
		font-family: helvetica;
	}
</style>
<div class="toolbar">
	<form method="get" action="code.php">
		<input type="hidden" name="url" value="<?php echo $_GET['url']; ?>" />
		<input type="hidden" name="token" value="<?php echo $_GET['token']; ?>" />
		<div style="float: left;">Mixpanel visual web integration</div>
		<div style="float: right;"><button>Save and get code</button></div>
	</form>
</div>
<iframe src="proxy.php?url=<?php echo $_GET['url']; ?>&token=<?php echo $_GET['token']; ?>" height="100%" width="100%"></iframe>