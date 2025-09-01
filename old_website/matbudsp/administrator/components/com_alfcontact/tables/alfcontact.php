<?php

defined( '_JEXEC' ) or die( 'Restricted Access' );

class TableALFcontact extends JTable 
{
	var $id=null;
	var $name=null;
	var $email=null;
	var $prefix=null;
	var $extra=null;
	var $defsubject=null;
	var $standard=null;
	var $access=null;
	var $published=null;
	
	function __construct(&$db) 
	{
		parent::__construct( '#__alfcontact', 'id', $db);
	}
}
?>