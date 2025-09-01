<?php

defined( '_JEXEC' ) or die( 'Direct access to this file is prohibited.' );

class TOOLBAR_alfcontact {
	function _DEFAULT() {
		JToolbarHelper::title(JText::_('MYCONTACTS'), 'generic.png');
		JToolbarHelper::custom('makeDefault', 'default.png', 'default.png', JText::_('DEFAULT'));
		JToolBarHelper::publishList();
		JToolBarHelper::unpublishList();
		JToolBarHelper::editList();
		JToolBarHelper::deleteList();
		JToolBarHelper::addNew();
		JToolbarHelper::preferences('com_alfcontact', '390');
	}
	function _NEW() {
		$cid = JRequest::getVar( 'cid', array(0), '', 'array' );
		if ( $cid[0] ) {
			// for existing items the button is renamed `close`
			JToolBarHelper::title(JText::_('EDITCONTACT'), 'generic.png');
		} else {
			JToolBarHelper::title(JText::_('NEWCONTACT'), 'generic.png');
		}
				
		JToolBarHelper::save();
		JToolBarHelper::apply();
		JToolBarHelper::cancel();
	}
}
?>

