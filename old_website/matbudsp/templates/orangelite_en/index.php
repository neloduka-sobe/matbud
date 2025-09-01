<?php defined( '_JEXEC' ) or die( 'Restricted access' );?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" >
<head>
	<jdoc:include type="head" />
	<link rel="stylesheet" href="templates/<?php echo $this->template ?>/css/template_css.css" type="text/css" /> 
</head>

<body background="templates/<?php echo $this->template ?>/images/tlo.png" class="body">
<center>
<table background="templates/<?php echo $this->template ?>/images/gorna_belka.png" width="100%" height="61" border="0" cellpadding="0" cellspacing="0">

<tr>
<td align="center">

<table border="0" cellpadding="0" cellspacing="0">
<tr>
<td>
	<b><a href="index.php" style="color: #ff9900">HOME</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="index.php?option=com_user&task=register" style="color: #ffffff">REGISTRATION</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="index.php?option=com_content" style="color: #ffffff">ARTICLES</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="index.php?option=com_weblinks" style="color: #ffffff">LINKS</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="index.php?option=com_search" style="color: #ffffff">SEARCH</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
</b>
</td>
<td>
	<jdoc:include type="modules" name="user4" />
</td>
<td>&nbsp;&nbsp;&nbsp;&nbsp;<jdoc:include type="modules" name="syndicate" /></td>
</tr>
</table>

</td>
</tr>
</table>


<table border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td background="templates/<?php echo $this->template ?>/images/tlo_l.png" width="39" rowspan="2"></td>
		<td background="templates/<?php echo $this->template ?>/images/logo.png" width="730" height="261" valign="bottom">
			
			<div id="menu_up" align="left">
			<span class="tytul_site"><?php echo $mainframe->getCfg('sitename');?></span><br />
			<div id="here_you_are">You are here: <jdoc:include type="module" name="breadcrumbs" /></div>
			</div>
			
		</td>
		<td background="templates/<?php echo $this->template ?>/images/tlo_r.png" width="39" rowspan="2"></td>
	</tr>
	<tr>
		<td background="templates/<?php echo $this->template ?>/images/tlo_w.png" width="730" height="261" valign="top">
			<table width="100%" border="0" cellpadding="2" cellspacing="0">
				<tr>
				
					<?php if($this->countModules('left')) : ?>
					<td align="left" width="150" valign="top">
						<div id="menu_block">											
							
							<jdoc:include type="modules" name="left" style="rounded"/>
						
						</div>
					</td>
					<?php endif; ?> 
					
					<td valign="top">
						<table width="100%" class="tresc" border="0" cellpadding="5" cellspacing="5">
							<tr>
								<td align="left">							 
																 
								<jdoc:include type="component" />
								<div align="center"><jdoc:include type="modules" name="syndicate" /></div>
								 
								</td>
							</tr>
						</table>
					</td>
					
					<?php if($this->countModules('right')) : ?>
					<td align="left" width="150" valign="top">
						 <div id="menu_block">
							
							<div class="newsflash_border">
							<h3>Newsflash</h3>
							<jdoc:include type="modules" name="top" />
							</div>
							
							<jdoc:include type="modules" name="right" style="rounded" />
						 
						 </div>
					</td>
					<?php endif; ?> 
					
				</tr>
			</table>
		</td>
	</tr>
</table>

<table background="templates/<?php echo $this->template ?>/images/stopka_w.png" width="100%" height="82" border="0" cellpadding="0" cellspacing="0">
<tr>
<td>

<center>
<table border="0" cellpadding="0" cellspacing="0">
<tr>
<td background="templates/<?php echo $this->template ?>/images/stopka.png" width="792" height="82" valign="top" align="left">
<br />

<div class="stopka" style="float:left;" align="center">
	<?php include_once('includes/footer.php'); ?>
</div>

<div class="stopka" style="float:right;">
<!-- start: The condition of free use of the template is to maintain a creator's links -->
Design by: <br />
<a href="http://www.szablony.eurolol.pl" class="stopka_link" title="szablony html, php, joomla">Szablony</a>
<a href="http://www.webook.pl" class="stopka_link" title="książki, cytaty, pisarze">Książki</a>
<a href="http://www.eurolol.pl" class="stopka_link" title="Śmieszne filmiki">Eurolol</a>
<a href="http://cpg.superhost.pl" class="stopka_link" title="Spolszczenia do gier">Spolszczenia</a>
<!-- end -->
</div>

</td>
</tr>
</table>
</center>

</td>
</tr>
</table>
</center>

<jdoc:include type="modules" name="debug" />

</body>
</html>