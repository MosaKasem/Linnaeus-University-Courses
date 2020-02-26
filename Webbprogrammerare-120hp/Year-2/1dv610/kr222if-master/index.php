<?php

// View
require_once('view/LoginView.php');
require_once('view/DateTimeView.php');
require_once('view/LayoutView.php');
require_once('view/RegisterView.php');
require_once('view/UsersTextSnippetsView.php');

// Controllers
require_once('controller/RouteController.php');
require_once('controller/LoginController.php');
require_once('controller/RegisterController.php');
require_once('controller/UsersTextSnippetController.php');

// Models
require_once('model/LoginModel.php');
require_once('model/RegisterModel.php');
require_once('model/SessionModel.php');
require_once('model/UserCredentials.php');
require_once('model/UsersTextSnippetModel.php');

//MAKE SURE ERRORS ARE SHOWN... MIGHT WANT TO TURN THIS OFF ON A PUBLIC SERVER
error_reporting(E_ALL);
ini_set('display_errors', 'On');

session_start();


$rm     = new    \model\RegisterModel();
$sm     = new    \model\SessionModel();
$lm     = new    \model\LoginModel();
$utsm   = new    \model\UsersTextSnippetModel();

$lv     = new    \view\LoginView($sm);
$lov    = new    \view\LayoutView();
$rv     = new    \view\RegisterView();
$dtv    = new    \view\DateTimeView();
$utsv   = new    \view\UsersTextSnippetsView($utsm->getFileName());

$utsc   = new   \controller\UsersTextSnippetController($sm, $utsv, $utsm);
$lc     = new   \controller\LoginController($lv, $lm, $sm);
$rc     = new   \controller\RegisterController($rv, $rm);

$mainController = new \controller\RouteController($sm, $lv, $lov, $rv, $dtv, $utsv, $utsc, $lc, $rc);
$mainController->start();
