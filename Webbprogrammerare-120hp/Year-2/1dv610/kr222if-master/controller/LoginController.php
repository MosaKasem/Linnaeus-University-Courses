<?php

namespace controller;

class LoginController {
    private $loginView        ; // view

    private $loginModel       ; // model
    private $sessionModel     ; // model
    private $userCredentials  ; // model
    

    public function __construct(\view\LoginView $lv, \model\LoginModel $lm, \model\SessionModel $sm) {
        $this->loginView        = $lv;
        $this->loginModel       = $lm;
        $this->sessionModel     = $sm;
    }

    public function loginControl() {
        $userCredentials = $this->loginView->getUserCredentials();

        //Returns true or false
        $successLogin = $this->loginModel->validateLogin($userCredentials);
        $session      = $this->sessionModel->getUserSession();

        if ($successLogin) {
            $this->loginView->keepMeLoggedValidation($userCredentials->getUsername(), $userCredentials->getPassword(), $session);
            $this->sessionModel->storeUserToSession($userCredentials->getUsername());
        } else {
            $this->loginView->incorrectUserCredentials();
        }
    }
    public function logoutControl() {
        $this->loginView->userLoggedOut();

        if (!$this->sessionModel->getUserSession()) 
        {
            $this->loginView->resetMessage();
        }
        $this->sessionModel->destroySession();
    }

}