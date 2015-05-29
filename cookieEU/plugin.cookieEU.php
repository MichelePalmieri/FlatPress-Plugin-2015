<?php
/*
Plugin Name: cookieEU
Version: 1.0
Plugin URI: http://www.michelepalmieri.it/informatica/flatpress/file/cookieEU.zip
Description: Plugin <a href=" http://www.michelepalmieri.it/informatica/flatpress" title="cookieEU">cookieEU</a> per FlatPress
Author: Michele Palmieri
Author URI: http://www.michelepalmieri.it
*/

add_action('wp_head', 'plugin_cookieEU_head', 0);

function plugin_cookieEU_head() {
	global $fp_config;
	$url = "/privacy";
	$lang = lang_load('plugin:cookieEU');
	$pdir=plugin_geturl('cookieEU');
	echo <<<COOKIEEU
	<!-- start of cookieEU -->
    <link rel="stylesheet" type="text/css" href="{$pdir}res/cookieEU.css" />	
    <script>
	var defaultscn = {
        'msg': '{$lang['plugin']['cookieEU']['msg']}',
        'btnmsg': '{$lang['plugin']['cookieEU']['btnmsg']}',
        'linkmsg': '{$lang['plugin']['cookieEU']['linkmsg']}',
        'expiresIn'       : 30,
	'CookieName'      : 'cookieEUok',
	'cookie_notice'   : 'cookieEUalert',
	'cookie_url'      : '{$url}'
    };	
    </script>
	<script type='text/javascript' src='{$pdir}res/cookieEU.js'></script>
	<!-- end of cookieEU -->
COOKIEEU;
}



?>


