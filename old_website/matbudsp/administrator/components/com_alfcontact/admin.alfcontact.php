<?php
// Mag alleen opgeroepen worden vanuit Joomla zelf
defined( '_JEXEC' ) or die( 'Restricted Access' );

// include admin.alfcontact.html.php
require_once(JApplicationHelper::getPath('admin_html'));

// include de controller file
require_once(JPATH_COMPONENT.DS.'controller.php');

//include all classes found in the tables directory
JTable::addIncludePath(JPATH_COMPONENT.DS.'tables');

$controller = new ALFcontactController(array( 'default_task' => 'showContact' ));
$controller->execute(JRequest::getVar( 'task'));
$controller->redirect(); 

?>
