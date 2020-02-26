<?php

namespace controller;

class RegisterController {
    private $registerView    ; // view

    private $registerModel   ; // model
    private $userCredentials ; // model
    

    public function __construct(\view\RegisterView $rv, \model\RegisterModel $rm) {
        $this->registerView     = $rv;
        $this->registerModel    = $rm;
    }
    public function registerControl() {
        $userCredentials = $this->registerView->returnRegisteredUser();

        $unsuccessful = $this->registerModel->validateName($userCredentials);
        if ($unsuccessful) {
            $userNameTaken = $this->registerModel->userExists();
            $this->registerView->setMessage($userNameTaken);
        } else {
            header('location:?');
        }
    }
}