<?php

/* ensuring that this file is called up from another file */
defined( '_JEXEC' ) or die( 'Direct access to this file is prohibited.' );

class HTML_alfcontact
{

// Procedure for building the contact form
function showContactForm($option, $name, $email, $emailid, $subject, $extravalue, $message, $rows)
	{
	global $mainframe;

	$user = & JFactory::getUser();
	
	$params = &JComponentHelper::getParams('com_alfcontact');
	$title = $params->get('title');
	$intro = $params->get('intro');
	$captcha = $params->get('captcha');
	$copyme = $params->get('copyme');
	?>
		
	<SCRIPT LANGUAGE="javascript" TYPE="text/javascript">
	<!--
	function update(id){ 
		var obj  = document.getElementById(id);
				
		if(obj.id == 'emailid2') {
			var ret = document.getElementById('extrainfo').value;
			var subj = document.getElementById('defsubject').value;
		} else
		{
			var ret  = obj.options[obj.selectedIndex].getAttribute('extrainfo');
			var subj = obj.options[obj.selectedIndex].getAttribute('defsubject');
		}
		
		if(!ret) {
		    document.getElementById('extrarow').style.display='none';
		} else
		{
            document.getElementById('extrarow').style.display='';
			document.getElementById('extraname').firstChild.nodeValue = ret + ':'; 
		}
		
		if(!subj) {
			document.getElementById('subject').value = '';	
		} else
		{
			document.getElementById('subject').value = subj;
		}
	}
	
	//-->
	</SCRIPT>
    
    <table class="alfc_table" width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
		<tr>
			<td height="20" class="componentheading alfc_heading"><?php echo $title; ?></td>
		</tr>
		<tr>
			<td><?php echo $intro; ?></td>
		</tr>
		<tr>
        	<td>
			    <p><table width="80%" border="0" cellspacing="5" cellpadding="5" align="center">
				<form name="myform" method="post" action="">
				  <tr>
				    <td class="alfc_label alfc_from" align="right" valign="top"><?php echo JText::_('FROM')?> </td>
				    <td>
					<?php 
						if (!$user->name) 
						{ 
						  ?><input class="text_area" name="name" id="name" type="text" size="30" value="<?php echo $name ; ?>"/><?php
						}
						else
						{ 
                        	echo $user->name;
							?><input type="hidden" name="name" value= "<?php echo $user->name ; ?>" /><?php
						}?>                    </td>
			      </tr>
				  <tr>
				    <td class="alfc_label alfc_email" align="right" valign="top"><?php echo JText::_('EMAIL')?> </td>
				    <td>
					<?php 
						if (!$user->email) 
						{ 
						  ?><input class="text_area" name="email" id="email" type="text" size="30" value="<?php echo $email ; ?>"/><?php
						}
						else
						{ 
                        	echo $user->email;
							?><input type="hidden" name="email" value= "<?php echo $user->email ; ?>" /><?php
						}?>					</td>
			      </tr>
				  <tr>
				    <td colspan="2" align="right" valign="top"><hr /></td>
			      </tr>
				  <tr>
					<td class="alfc_label alfc_to" align="right" valign="top"><?php echo JText::_('TO')?> </td>
					<td>
					<?php 
					if (count($rows) > 1) { 
						$element = 'emailid';
						?>
						<select name="emailid" id="emailid" STYLE="width: 215px" onchange="update('emailid');">
						<?php
                        // readout of the data sets in the array
                    	foreach ($rows as $row) 
							{ 
								if ($row->standard)
								{
									?><option value="<?php echo $row->id; ?>" extrainfo="<?php echo $row->extra; ?>" 
                                    		defsubject="<?php echo $row->defsubject; ?>" selected="selected"><?php echo $row->name; ?></option><?php
								}
								else
								{
									?><option value="<?php echo $row->id; ?>" extrainfo="<?php echo $row->extra; ?>" 
                                    	defsubject="<?php echo $row->defsubject; ?>" > <?php echo $row->name; ?></option><?php
								}	
							} ?>
						</select>
						<?php
					}
				    else
				    {
					  if (count($rows) == 0) {
						echo $mainframe->getCfg('fromname');
						?><input type="hidden" name="emailid" value="99" /><?php
					  } 
				      else
                      {  
						echo $rows[0]->name;
						$element = 'emailid2'; 
						?><input type="hidden" id="emailid2" name="emailid" value= "<?php echo $rows[0]->id; ?>" />
						  <input type="hidden" id="extrainfo" name="extrainfo" value= "<?php echo $rows[0]->extra; ?>" />
						  <input type="hidden" id="defsubject" name="defsubject" value= "<?php echo $rows[0]->defsubject; ?>" /><?php
						  
					  } 
				    }			
				    ?>
                    </td>  
				  </tr>	
				  <tr>
					<td class="alfc_label alfc_subject" align="right" valign="top"><?php echo JText::_('SUBJECT')?> </td>
					<td><input class="text_area" name="subject" id="subject" type="text" size="30" value="<?php echo $subject; ?>"/></td>
				</tr>
				<tr>
					<td class="alfc_label alfc_message" align="right" valign="top"><?php echo JText::_('MESSAGE')?> </td>
					<td><textarea name="message" cols="50" rows="10" wrap="virtual" value="<?php echo $message; ?>"><?php echo $message; ?></textarea></td>
				</tr>
                
				<tr id="extrarow" style="display:none;" >
				    <td class="alfc_label alfc_extra" align="right" valign="top"><span id="extraname">empty:</span></td>
				   	<td><input class="text_area" name="extravalue" id="extravalue" type="text" size="30" value="<?php echo $extravalue; ?>"/></td>
			    </tr>
                
				
				<?php     
                 if ($copyme == 1) { ?>
                   	<tr>
				  		<td align="right"><input type="checkbox" name="copy" id="copy" /></td>
				  		<td class="alfc_label alfc_copytome"><?php echo JText::_('COPYTOME')?></td>
				    </tr>
				<?php }
				
				 if ($captcha == 1) { ?>
					<tr>
						<td></td>
						<td><img src="<?php echo JRoute::_('index.php?option=com_alfcontact&task=displaycaptcha'); ?>"></td>
					</tr>
                    <tr>
                    	<td class="alfc_label alfc_captcha" align="right" valign="top"><?php echo JText::_('VERIFICATION')?> </td>
                        <td><input type="text" name="word" /></td>
                    </tr>
                    
				<?php } ?>
				
				<tr>
					<td align="center">&nbsp;</td>
				    <td class="alfc_button alfc_send"><input type="submit" value="<?php echo JText::_('SEND')?>" class="button" id="button" /></td>
				</tr>
				
				<input type="hidden" name="task" value= "sendemail" />
				<input type="hidden" name="option" value= "<?php echo $option; ?>" />
								
				<?php
				if($element == 'emailid2') {
					echo "<SCRIPT LANGUAGE='javascript'>update('emailid2');</SCRIPT>";
				} else
				{
					echo "<SCRIPT LANGUAGE='javascript'>update('emailid');</SCRIPT>";
				}
				?>
				
				</form>
				</table>
		      </p>
		  </td>    
		</tr> 
	</table>
	<?php
	}
}
?>
