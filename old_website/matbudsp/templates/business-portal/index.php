<?php

/**
Template for Joomla 1.5

Michael Schmid
www.nachgerechnet.de
email: template@nachgerechnet.de

Dieses Template steht unter der GNU/GPL Lizenz. Mit der Verwendung dieses Templates erklären Sie sich damit einverstanden.

!!! Die vom Autor angebrachten Links müssen auf jeder Seite sichtbar erhalten bleiben, und dürfen erst nach Rücksprache mit
dem Autor entfernt, bzw. geändert oder verschoben werden. !!!
**/




// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" >
<head>
<jdoc:include type="head" />
<link rel="shortcut icon" href="images/favicon.ico" />
<link rel="stylesheet" href="templates/system/css/system.css" type="text/css" />
<link rel="stylesheet" href="templates/system/css/general.css" type="text/css" />
<link rel="stylesheet" href="templates/<?php echo $this->template ?>/css/template.css" type="text/css" />
<link rel="stylesheet" href="templates/<?php echo $this->template ?>/css/typografie.css" type="text/css" />


<!--[if lte IE 6]>
<link href="templates/<?php echo $this->template ?>/css/ieonly.css" rel="stylesheet" type="text/css" />
<![endif]-->


</head>
<body>

<a name="up" id="up"></a>
<jdoc:include type="message" />
<div id="center">
	<div id="wrapperholder">
		<div id="wraptop"></div>
		<div id="wrap">
			<div id="header">
				<div id="headerlinks">
					<div id="headerrechts">
						<div id="logo">
						</div>
						<jdoc:include type="modules" name="top" />
						<?php if($this->countModules('user4')) : ?>
							<div id="user4"><jdoc:include type="modules" name="user4" style="xhtml" /></div>
						<?php endif; ?>
					</div>
				</div>
			</div>
			<div id="bar"><div id="topmenu"><jdoc:include type="modules" name="user3" /></div></div>
			
			<?php if($this->countModules('breadcrumb')) : ?>
			<div id="pathway"><jdoc:include type="module" name="breadcrumbs" /></div>
			<?php endif; ?>
				
			<div style="clear:both;">&nbsp;</div>
			
			<div id="mainholder">
				
			<?php
				if(!$this->countModules('right')) {
					$width = "735";
				} else {
					$width = "520";
				}
			?>
			<?php if($this->countModules('left')) : ?>
				<div id="left"><jdoc:include type="modules" name="left" style="menu" /></div>
				<?php endif; ?>

				<div id="main" style="width:735px;">
					<?php if($this->countModules('user1')) : ?>
					<div id="user1"><jdoc:include type="modules" name="user1" style="xhtml" /></div>
					<?php endif; ?>
				
					<?php if($this->countModules('user2')) : ?>
					<div id="user2"><jdoc:include type="modules" name="user2" style="xhtml" /></div>
					<?php endif; ?>
													
					<?php if($this->params->get('showComponent')) : ?>
					<div style="float:left; width:<?php echo $width; ?>px;"><jdoc:include type="component" /></div>
					<?php endif; ?>
									
					<?php if($this->countModules('right')) : ?>
					<div id="right"><jdoc:include type="modules" name="right" style="xhtml" /></div>
					<?php endif; ?>									
				</div>

			</div>
		</div>
		<div id="footer">
			<div id="syndicate"><jdoc:include type="modules" name="syndicate" /></div>
			<div id="footerText"><jdoc:include type="modules" name="footer" /></div>
		</div>
		<div id="wrapunten"></div>
	</div>
<div id="power">
<div id="powerText">

<?php
/**
!!! Der folgende Link darf ohne eine Lizenz welche beim Autor erworben werden kann nicht entfernt werden. !!!
!!! Without a licence you are not allowed to remove the following link !!!
**/
?>
<a href="http://www.nachgerechnet.de/private-krankenversicherung.html">private Krankenversicherung</a> Vergleich <a href="http://www.nachgerechnet.de/krankenzusatzversicherung/zahnzusatzversicherung.html">Zahnzusatzversicherung</a></div>
<?php
/**
!!!!!!
**/
?>
</div>

<jdoc:include type="modules" name="debug" />

</body>
</html>
