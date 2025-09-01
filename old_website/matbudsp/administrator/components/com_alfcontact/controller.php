<?php
// Mag alleen opgeroepen worden vanuit Joomla zelf
defined( '_JEXEC' ) or die( 'Restricted Access' );

jimport('joomla.application.component.controller');

class ALFcontactController extends JController
{
	function __construct( $default = array() )
	{
		parent::__construct($default);
		$this->registerTask('add', 'edit');
		$this->registerTask('apply','save');
		$this->registerTask('unpublish','publish');
		$this->registerTask('accessspecial', 'accesspublic');
		$this->registerTask('accessregistered', 'accesspublic');
	}

	function accesspublic()
	{
		global $option;
		$cid = JRequest::getVar( 'cid', array(), '', 'array');
		$id = $cid[0];
		
		switch( $this->_task)
		{
			case 'accessspecial':
				$access = '2';
				break;
			case 'accessregistered':
				$access = '1';
				break;
			default:
				$access = '0';
		}
		
		$row =& JTable::getInstance('alfcontact', 'Table');
		$row->load( $id );
		$row->access = $access;

		if ( !$row->check() ) {
			return $row->getError();
		}
		if ( !$row->store() ) {
			return $row->getError();
		}

		$this->setRedirect( 'index.php?option=' . $option);
	}
	
	
	function publish()
	{
		global $option;
		$cid = JRequest::getVar( 'cid', array(), '', 'array');
		if( $this->_task == 'publish')
		{
			$publish = 1;
		}
		else
		{
			$publish = 0;
		}
		$alfcontactTable =& JTable::getInstance('alfcontact', 'Table');
		$alfcontactTable->publish($cid, $publish);
		$this->setRedirect( 'index.php?option=' . $option);	
	}

	function makedefault()
	{
		global $option;
		$cid = JRequest::getVar( 'cid', array(), '', 'array');
		$id = $cid[0];
		$db =& JFactory::getDBO();
		
		$query = "UPDATE #__alfcontact SET standard = (id = $id) ";
		
		$db->setQuery( $query );
		$db->Query();
		
		$this->setRedirect( 'index.php?option=' . $option);
	}
		
	function edit() 
	{
		global $option;
		$row = & JTable::getInstance('alfcontact', 'Table');
		$cid = JRequest::getVar( 'cid', array(0), '', 'array');
		$id = $cid[0];
		$row->load($id);
	
		$lists = array();
	
		$lists['published'] = JHTML::_('select.booleanlist', 'published', '', $row->published);
		$lists['access'] = JHTML::_('list.accesslevel', $row); 
	
		HTML_ALFContact::editContact( $row, $lists, $option );
	}
	
	function save() 
	{
		global $option;
		$row = & JTable::getInstance('alfcontact', 'Table');
		
		if (!$row->bind( JRequest::get('POST' ))) 
		{
			echo "<script> alert('".$row->getError()."'); window.history.go(-1); </script>\n";
			exit();
		}
		if (!$row->store()) 
		{
			echo "<script> alert('".$row->getError()."'); window.history.go(-1); </script>\n";
			exit();
		}
	
		switch ($this->_task)
		{
			case 'apply':
				$msg = 'Changes to Contact Saved';		
				$link = 'index.php?option=' . $option . '&task=edit&cid[]=' . $row->id;
				break;
			
			case 'save':
			default:
				$msg = 'Contact Saved';
				$link = 'index.php?option=' . $option;
				break;
		}
			
		$this->setRedirect($link, $msg);
	}
	
	function showContact() 
	{
		global $option, $mainframe;
		$limit = JRequest::getVar('limit',$mainframe->getCfg('list_limit'));
		$limitstart = JRequest::getVar('limitstart', 0);
		$db =& JFactory::getDBO();
		$query = "SELECT count(*) FROM #__alfcontact";
		$db->setQuery( $query );
		$total = $db->loadResult();
		
		
		$query = 'SELECT ac.*, g.name AS groupname FROM #__alfcontact AS ac'
		. ' LEFT JOIN #__groups AS g ON g.id = ac.access';
		
		
		//$query = "SELECT * FROM #__alfcontact";
		$db->setQuery( $query, $limitstart, $limit );
		$rows= $db->loadObjectList();
		if ($db->getErrorNum())
		{
			echo $db->stderr();
			return false;
		}
		jimport('joomla.html.pagination');
		$pageNav = new JPagination($total, $limitstart, $limit);
		HTML_ALFcontact::showContact( $option, $rows, $pageNav );
	}
	
	function remove()
	{
		global $option;
		$cid = JRequest::getVar( 'cid', array(), '', 'array');
		$db =& JFactory::getDBO();
		if (count($cid))
		{
			$cids = implode( ',', $cid);
			$query = "DELETE FROM #__alfcontact WHERE id IN ($cids)";
			$db->setQuery( $query );
			if (!$db->query())
			{	
				echo "<script> alert('".$db->getErrorMsg()."');
					window.history.go(-1); </script>\n";
			}
		}
		$this->setRedirect('index.php?option=' . $option);
	}

}
?>
