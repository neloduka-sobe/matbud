<?php

defined( '_JEXEC' ) or die( 'Direct access to this file is prohibited.' );

require_once( JApplicationHelper::getPath( 'toolbar_html' ) );

switch($task) 
{
	case 'edit':
	case 'add' :
		TOOLBAR_alfcontact::_NEW();
		break;
	default:
		TOOLBAR_alfcontact::_DEFAULT();
		break;
}
?>
