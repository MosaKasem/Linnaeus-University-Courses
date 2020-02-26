<?php

namespace view;

class LoginView {
	private static $login 			= 	'LoginView::Login';
	private static $logout 			= 	'LoginView::Logout';

	private static $name 			= 	'LoginView::UserName';
	private static $password	    =  	'LoginView::Password';

	private static $cookieName	    = 	'LoginView::CookieName';
	private static $cookiePassword  = 	'LoginView::CookiePassword';
	private static $keep 			= 	'LoginView::KeepMeLoggedIn';

	private static $messageId 		=	'LoginView::Message';

	private $message;
	private $session;


	public function __construct($sm) {
		$this->message = "";
		$this->session = $sm;
	}

	public function response() : string {
		$userIsLogged = $this->session->userIsLoggedIn();

		if ($userIsLogged) {
			$response = $this->generateLogoutButtonHTML();
		} else {
			$response = $this->generateLoginFormHTML();
		}
		return $response;
	}

	private function generateLogoutButtonHTML() : string {
		return '
			<form  method="post" >
				<p id="' . self::$messageId . '">' . $this->getMessage() .'</p>
				<input type="submit" name="' . self::$logout . '" value="logout"/>
			</form>
		';
	}
	
	private function generateLoginFormHTML() : string {

		return '
			<form method="post" > 
				<fieldset>
					<legend>Login - enter Username and password</legend>
					<p id="' . self::$messageId . '">' . $this->getMessage() . '</p>
					
					<label for="' . self::$name . '">Username :</label>
					<input type="text" id="' . self::$name . '" name="' . self::$name . '" value="' . $this->getRequestUserName() . '" />

					<label for="' . self::$password . '">Password :</label>
					<input type="password" id="' . self::$password . '" name="' . self::$password . '" />

					<label for="' . self::$keep . '">Keep me logged in  :</label>
					<input type="checkbox" id="' . self::$keep . '" name="' . self::$keep . '" />
					
					<input type="submit" name="' . self::$login . '" value="login" />
				</fieldset>
			</form>
		';
	}

	private function validateInput() : bool {
		if (empty($this->getRequestUserName())) {
			$this->setMessage('Username is missing');
			return false;
		}
		if (empty($this->getRequestPassword())) {
			$this->setMessage('Password is missing');
			return false;
		}
		return true;
	}

	public function incorrectUserCredentials() : void {
		$this->message = 'Wrong name or password';
	}
	public function userLoggedOut() : void {
		$this->message = 'Bye bye!';
	}
	public function resetMessage() : void {
		$this->message = "";
	}

	public function setMessage ($msg) : void {
		$this->message = $msg;
	}
	public function getMessage () : string {
		return $this->message;
	}

	public function userWantsToLogin() : bool {
		return isset($_POST[self::$login]) && $this->validateInput();
	}
	public function userWantsToLogOut() : bool {
		return isset($_POST[self::$logout]) ? true : false;
	}
	public function keepMeLoggedIn() : bool {
		return isset($_POST[self::$keep]) ? $_POST[self::$keep] : false;
	}

	public function getRequestUserName() : string {
		return isset($_POST[self::$name]) ? $_POST[self::$name] : "";
	}
	public function getRequestPassword() : string {
		return isset($_POST[self::$password]) ? $_POST[self::$password] : "";
	}

	public function getUserCredentials() {
		if ($this->validateInput() == true) 
		{
			return new \model\UserCredentials($this->getRequestUserName(), $this->getRequestPassword());
		}
	}

	public function keepMeLoggedValidation($username, $password, $session) : void
	{
		if ($this->keepMeLoggedIn() && !$session) {
			$this->saveCookie($username, $password);
			$this->setMessage('Welcome and you will be remembered');
		} else if (!$session) {
			$this->setMessage("Welcome");
		} else {
			$this->setMessage("");
		}
	}
	
	public function saveCookie($username, $password) : void {
		setcookie(self::$cookieName, $username, time() + 86400, "/");
		setcookie(self::$cookiePassword, $password, time() + 86400, "/");
	}

	
}
