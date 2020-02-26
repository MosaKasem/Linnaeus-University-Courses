<?php

namespace view;

class RegisterView {
    private static $username 		= "RegisterView::UserName";
    private static $password 		= "RegisterView::Password";
	private static $passwordRepeat  = "RegisterView::PasswordRepeat";
	
	private static $register 		= "RegisterView::Register";
	private static $messageId 		= "RegisterView::Message";

	private $message;

	public function __construct() {
		$this->message = '';
	}
	
	public function response() : string {
		$response =	$this->generateRegisterFormHTML();
		return $response;
	}
    
	private function generateRegisterFormHTML() : string {
		return '
			<form method="post">
				<fieldset>
					<legend>Register a new user - Write Username and password</legend>
					<p id="' . self::$messageId . '">' . $this->getMessage() . '</p>

					<label for="' . self::$username . '">Username :</label>
					<input type="text" id="' . self::$username . '" name="' . self::$username . '" value="' . strip_tags($this->getRequestUserName()) . '" />

					<label for="' . self::$password . '">Password :</label>
					<input type="password" id="' . self::$password . '" name="' . self::$password . '" />
					
					<label for="' . self::$passwordRepeat . '">Confirm Password :</label>
					<input type="password" id="' . self::$passwordRepeat . '" name="' . self::$passwordRepeat . '" />

					<input type="submit" name="' . self::$register . '" value="register" />

				</fieldset>
			</form>
		';
	}
	
	public function getRequestUserName() : string {
		return isset($_POST[self::$username]) ? trim($_POST[self::$username]) : "";
	}
	public function getRequestPassword() : string {
		return isset($_POST[self::$password]) ? trim($_POST[self::$password]) : "";
	}
	public function getReqPasswordRepeat() : string {
		return isset($_POST[self::$passwordRepeat]) ? trim($_POST[self::$passwordRepeat]) : "";
	}

	public function userWantsToRegister() : bool {
		return isset($_POST[self::$register]) && $this->validateInput();
	}
	private function validateInput() : bool {
		$userName	= $this->getRequestUserName();
		$passWord 	= $this->getRequestPassword();
		$passRepeat = $this->getReqPasswordRepeat();

		if (preg_match('/[^A-Za-z0-9]/', trim($userName))) {
			$this->setMessage("Username contains invalid characters.");
			return false;
		}
		if (empty($userName) && empty($passWord)) {
			$this->setMessage('Username has too few characters, at least 3 characters. Password has too few characters, at least 6 characters.');
			return false;
		}
		if (empty($userName) || strlen($userName) < 3) {
			$this->setMessage('Username has too few characters, at least 3 characters.');
			return false;
		}
		if (strlen($passWord) < 6) {
			$this->setMessage('Password has too few characters, at least 6 characters.');
			return false;
		}  else if ($passWord !== $passRepeat) {
			$this->setMessage('Passwords do not match.');
			return false;
		}
		return true;
	}

	public function returnRegisteredUser() : \model\UserCredentials {
		if ($this->validateInput()) 
		{
			return new \model\UserCredentials($this->getRequestUserName(), $this->getRequestPassword());
		}
	}

	public function setMessage($message) : void {
		$this->message = $message;
	}
	public function getMessage() : string {
		return $this->message;
	}

}