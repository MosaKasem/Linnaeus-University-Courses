<?php

namespace controller;

class RouteController {

    private $isLoggedIn                 ; // Variable

    private $register                   ; // Model
    private $sessionModel               ; // Model

    private $loginView                  ; // View
    private $layoutView                 ; // View
    private $registerView               ; // View
    private $dateTimeView               ; // View
    private $usersTextSnippetsView      ; // View     

    private $loginController            ; // Controller
    private $registerController         ; // Controller
    private $UsersTextSnippetController ; // Controller


    public function __construct(
    \model\SessionModel $sm,
    \view\LoginView $lv,
    \view\LayoutView $lov,
    \view\RegisterView $rv,
    \view\DateTimeView $dtv,
    \view\UsersTextSnippetsView $utsv,
    UsersTextSnippetController $utsc,
    LoginController $lc,
    RegisterController $rc)
    {
        // Model's folder initiation
        $this->sessionModel     = $sm;

        // View's Folder initiation
        $this->loginView               = $lv;
        $this->layoutView              = $lov;
        $this->registerView            = $rv;
        $this->dateTimeView            = $dtv;
        $this->usersTextSnippetsView   = $utsv;

        // Controller's folder initiation
        $this->UsersTextSnippetController    = $utsc;
        $this->loginController               = $lc;
        $this->registerController            = $rc;
    }

    public function start() {
        if ($this->loginView->userWantsToLogin()) {
            $this->loginController->loginControl();
        }
        if ($this->loginView->userWantsToLogOut()) {
            $this->loginController->logoutControl();
        }

        if ($this->registerView->userWantsToRegister()) {
            $this->registerController->registerControl();
        }

        if ($this->sessionModel->handleIsLoggedIn()) {
            $this->UsersTextSnippetController->initiateFileReader();
        }

        // ?register ? true : false
        $registerView = $this->layoutView->getRegisterView();
        if ($registerView) {
            $this->layoutView->render($this->sessionModel->handleIsLoggedIn(), $this->registerView, $this->dateTimeView, $this->usersTextSnippetsView);
        } else {
            $this->layoutView->render($this->sessionModel->handleIsLoggedIn(), $this->loginView, $this->dateTimeView, $this->usersTextSnippetsView);
        }
    }
}