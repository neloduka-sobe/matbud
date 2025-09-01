<?php
/* ensure that this file is called from another file */
defined( '_JEXEC' ) or die( 'Direct access to this file is prohibited.' );

class HTML_ALFContact {
	function editContact( $row, $lists, $option ) {
		?>
        <form action="index.php" method="post" name="adminForm" id="adminForm">
        	<fieldset class="adminForm">
            	<legend><?php echo JText::_('CONTACT') ?></legend>
	  	<table class="admintable">
		<tr>
			<td width="150" align="right" class="key">
			<?php echo JText::_('NAME') ?>
			</td>
			<td>
			<input class="text_area" type="text" name="name" 
            id="name" size="50" maxlength="250" 
            value="<?php echo $row->name; ?>" />
			</td>
		</tr>
		<tr>
			<td width="150" align="right" class="key">
			<?php echo JText::_('EMAIL') ?>
			</td>
			<td align="left">
			<input class="text_area" type="text" name="email" 
            id="email" size="50" maxlength="250"
            value="<?php echo $row->email; ?>" />
			</td>
		</tr>
		<tr>
			<td width="150" align="right" class="key">
			<?php echo JText::_('PREFIX') ?>
			</td>
			<td align="left">
			<input class="text_area" type="text" name="prefix" 
            id="prefix" size="50" maxlength="250"
            value="<?php echo $row->prefix; ?>" />
			</td>
		</tr>
        <tr>
			<td width="150" align="right" class="key">
			<?php echo JText::_('EXTRANAME') ?>
			</td>
			<td align="left">
			<input class="text_area" type="text" name="extra" 
            id="extra" size="50" maxlength="250"
            value="<?php echo $row->extra; ?>" />
			</td>
		</tr>
        <tr>
			<td width="150" align="right" class="key">
			<?php echo JText::_('DEFSUBJECT') ?>
			</td>
			<td align="left">
			<input class="text_area" type="text" name="defsubject" 
            id="defsubject" size="50" maxlength="250"
            value="<?php echo $row->defsubject; ?>" />
			</td>
		</tr>
        <tr>
			<td width="150" align="right" class="key">
			<?php echo JText::_('PUBLISHED') ?>
			</td>
			<td>
			    <?php echo $lists['published']; ?>
			</td>
		</tr>
        <tr>
			<td width="150" align="right" class="key">
			<?php echo JText::_('ACCESS LEVEL') ?>
			</td>
			<td>
			    <?php echo $lists['access']; ?>
			</td>
		</tr>		
		</table>
        </fieldset>
		<input type="hidden" name="id" value="<?php echo $row->id; ?>" />
		<input type="hidden" name="option" value="<?php echo $option; ?>" />
		<input type="hidden" name="task" value="" />
	</form>
  <?php
	}
	
	function showContact( $option, $rows, $pageNav ) {
    	?>
        <form action="index.php" method="post" name="adminForm">
    	<table class="adminheading">
    	<tr>
	  		<th> </th>
    	</tr>
		</table>
	
    	<table class="adminlist">
		<thead>
        <tr>
	  		<th width="20" align="center">#</th>
	  		<th width="20"><input type="checkbox" name="toggle" value="" onclick="checkAll(<?php echo count($rows); ?>);" /></th>
	  		<th width="15%" align="left"><?php echo JText::_('NAME') ?></th>
	  		<th width="50" align="center"><?php echo JText::_('DEFAULT') ?></th>
	  		<th width="15%" align="left"><?php echo JText::_('EMAIL') ?></th>
            <th width="10%" align="left"><?php echo JText::_('PREFIX') ?></th>
			<th width="10%" align="left"><?php echo JText::_('EXTRANAME') ?></th>
            <th width="10%" align="left"><?php echo JText::_('DEFSUBJECT') ?></th>
            <th> </th> 
            <th width="75" align="center"><?php echo JText::_('PUBLISHED') ?></th>
	  		<th width="100" align="center"><?php echo JText::_('ACCESS LEVEL') ?></th>
            <th width="25" align="center"><?php echo JText::_('ID') ?></th>
	  	</tr>
        </thead>
    <?php
	jimport('joomla.filter.output');
	$k = 0;
    for ($i=0, $n=count($rows); $i < $n; $i++) {
	  $row = $rows[$i];

	  $checked 	 = JHTML::_('grid.id', $i, $row->id );
	  $published = JHTML::_('grid.published', $row, $i);
	  $access    = JHTML::_('grid.access', $row, $i);
	  $standard  = $row->standard;
	  $id        = $row->id;  
	  
	  $link      = JFilterOutput::ampReplace('index.php?option=' .$option . '&task=edit&cid[]='. $row->id); 		
	  ?>

	  <tr class="<?php echo "row$k"; ?>">
        <td align="center"><?php echo $i+$pageNav->limitstart+1;?></td>
		<td><?php echo $checked; ?></td>
		<td><a href="<?php echo $link; ?>"><?php echo $row->name; ?></a></td>
		<td align="center">
			<?php
			if ($standard == "1") 
			{
				?><img src="templates/khepri/images/menu/icon-16-default.png" alt="<?php echo JText::_( 'Default' ); ?>" /><?php
			}
			?>	
        </td>
		<td><?php echo $row->email; ?></td>
        <td><?php echo $row->prefix; ?></td>
        <td><?php echo $row->extra; ?></td>
        <td><?php echo $row->defsubject; ?></td>
        <td> </td>
        <td align="center"><?php echo $published; ?></td>
		<td align="center"><?php echo $access; ?></td>
        <td align="center"><?php echo $id; ?></td>
	  </tr>
      <?php
			$k = 1 - $k;
		}
    ?>
    <tfoot>
    	<td colspan="12"><?php echo $pageNav->getListFooter(); ?></td>
    </tfoot>
      </table>
	  <input type="hidden" name="option" value="<?php echo $option; ?>" />
	  <input type="hidden" name="task" value="" />
	  <input type="hidden" name="boxchecked" value="0" />
	  </form>
    <?php
	}
}
?>
