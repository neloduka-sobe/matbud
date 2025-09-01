<?php

//Alleen op te roepen vanuit joomla zelf
defined( '_JEXEC' ) or die( 'Restricted access' );

jimport('joomla.application.helper');
jimport( 'joomla.mail.helper' );
require_once( JApplicationHelper::getPath( 'front_html' ) );
JTable::addIncludePath(JPATH_ADMINISTRATOR.DS.'components'.DS.$option.DS.'tables');

switch( $task ) {
		case "displaycaptcha":
                displaycaptcha();
                break;
		case "sendemail":
                SendEmail($option);
                break;
        default:
                ShowContactForm($option);
                break;
}

function displaycaptcha()
{
	global $mainframe;
		
	$params = &JComponentHelper::getParams('com_alfcontact');
		
	if ($params->get('captcha')){ 			
		$Ok = null;
		$mainframe->triggerEvent('onCaptcha_Display', array($Ok));
		if (!$Ok) {
			echo "<br/>Error displaying Captcha<br/>";
			}																																												
		} 
}
	
function CheckCaptcha()
{
		global $mainframe;

		$params = &JComponentHelper::getParams('com_alfcontact');
		
		// not using captcha!
		if (!$params->get('captcha')) { 
			return true;
		}
		$return = false;
		$word = JRequest::getVar('word', false, '', 'CMD');
		$mainframe->triggerEvent('onCaptcha_confirm', array($word, &$return));
		if ($return) {
			return true;
		} else { 
			return false; 
			}
}

function SendEmail($option)
{
      	global $mainframe;
		$params = &JComponentHelper::getParams('com_alfcontact');
		
		$verbose = $params->get('verbose');
		$html = $params->get('htmlmail');
		
		if ($html) {
			$sep  = "<BR>";
			$line = "<HR>";
		} else {
			$sep  = "\n";
			$line = "-------------------------------------------------------------------------------\n";
		}
						
		if (!CheckCaptcha()) {
			JError::raiseWarning("0", JText::_('WRONG_CAPTCHA'));
			ShowContactForm($option);
			return false;
		}
		
		//Variable ophalen die verstuurd is via URL
        $name       = JRequest::getVar('name','');
        $email      = JRequest::getVar('email','');		
		$emailid    = JRequest::getVar('emailid','');
        $subject    = JRequest::getVar('subject','');
        $message    = JRequest::getVar('message','');
		$copy       = JRequest::getVar('copy','');
		$extravalue = JRequest::getVar('extravalue','');
		
		//check if all fields are filled, otherwise give errormessage
        if(!$name || !$email || !$emailid || !$subject || !$message)
        {
        	JError::raiseWarning("0", JText::_('NOTALLFILLED'));
            ShowContactForm($option);
            return;
        }
        
		//check if a valid emailaddress has been filled in
		if(!JMailHelper::isEmailAddress($email))
        {
            JError::raiseWarning("0", JText::_('INVALIDEMAILADDRESS'));
            ShowContactForm($option);
            return;
        }
		
		//check for maximum characters if applicable
		$max = $params->get('maxchars');
		if($max && (strlen($message) > $max))
        {
            JError::raiseWarning("0", JText::_('TOOMANYCHARS'));
            ShowContactForm($option);
            return;
        }
				
        //send email/copy and report if succesfull
		if ($copy) 
		{
			$sitename = $mainframe->getCfg('fromname');
			$subject2 = JText::_('COPYOFMESSAGE').' '.$sitename ;
			JUtility::sendMail($email , $name, $email, $subject2, $message, 0);
		} 
		
		//get email address coresponding to ID number
		if ($emailid == '99')
		{
			$emailto = $mainframe->getCfg('mailfrom'); 
		}
		else
		{		
			$db = & JFactory::getDBO();
			$query = "SELECT * FROM #__alfcontact WHERE id =". $emailid;
		
			$db->setQuery( $query );
        	$rows= $db->loadObjectList();
			$emailto= $rows[0]->email;
			$prefix= $rows[0]->prefix;
			$extraname= $rows[0]->extra;
		
            //Adding prefix to subject
			$subject = $prefix.' '.$subject;
		}
		
		//Add an infomation banner to the top of the contacts message.
		if ($verbose)
		{
			$newmsg = JText::_('DETAILS_HEADER') . $sep;
			$newmsg = $newmsg . $line;
			$newmsg = $newmsg . JText::_('DETAILS_NAME') . " " . $name . $sep;
			$newmsg = $newmsg . JText::_('DETAILS_EMAIL') . " " . $email . $sep;
			$newmsg = $newmsg . JText::_('DETAILS_IP') . " " . $_SERVER['REMOTE_ADDR'] . $sep;
			$newmsg = $newmsg . JText::_('DETAILS_BROWSER') . " " .$_SERVER['HTTP_USER_AGENT'] . $sep;
			$newmsg = $newmsg . $line;
		}
		// Add information from extra filed if applicable
		if ($extraname)
		{
			$newmsg = $newmsg . $extraname . ": " . $extravalue . $sep;
			$newmsg = $newmsg . $line;
		}
		
		$message = $newmsg . $sep . nl2br($message);
		
		
		//send email
		JUtility::sendMail($email , $name, $emailto, $subject, $message, $html);
   
   		//redirect
		$redirect = $params->get('redirect');
		$messagesend = $params->get('messagesend');
		$link = JRoute::_($redirect);
		
		if ($messagesend && $redirect)
		{
			$mainframe->redirect($link, $messagesend, message);
		}
		else
		{
			if (!$messagesend) 
			{
				$mainframe->redirect($link); 
			}
			else
			{
				echo $messagesend;
			}
		}
}       
        
function showContactForm($option)
{
        //Verbinding maken met database
        $db = & JFactory::getDBO();
		
        $user = & JFactory::getUser();
				
        /* SQL query of all published entries wich may be seen by current user*/        
		$aid = $user->GET('aid', 0);
		
		$query = "SELECT * FROM #__alfcontact WHERE published='1' AND access <=" . (int) $aid;
				
		$db->setQuery( $query );
        $rows = $db->loadObjectList();
        if ($db->getErrorNum())
                {
                        echo $db->stderr();
                        return false;
                }
                
        $name       = JRequest::getVar('name','');
		$email      = JRequest::getVar('email','');
		$emailid    = JRequest::getVar('emailto','');
        $subject    = JRequest::getVar('subject','');
        $message    = JRequest::getVar('message','');
		$copy       = JRequest::getVar('copy','');
		$extravalue = JRequest::getVar('extravalue','');
        
		HTML_alfcontact::ShowContactForm($option, $name, $email, $emailid, $subject, $extravalue, $message, $rows);
		 
}
?>
