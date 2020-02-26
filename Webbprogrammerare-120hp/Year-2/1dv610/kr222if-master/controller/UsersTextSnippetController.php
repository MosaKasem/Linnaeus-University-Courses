<?php

namespace controller;

class UsersTextSnippetController
{
    private $sessionModel       ; // Model
    private $UserSnippetsModel  ; // Model

    private $userTextSnippView  ; // View


    public function __construct(\model\SessionModel $sm, \view\UsersTextSnippetsView $utsv, \model\UsersTextSnippetModel $utxm) {
        $this->sessionModel         = $sm;
        $this->userTextSnippView    = $utsv;
        $this->UserSnippetsModel    = $utxm;
    }

    public function initiateFileReader()
    {
        if($this->userTextSnippView->textSnippetMaxLimit())
        {
            $this->userTextSnippView->resettingTextSnippetWall();
            $this->UserSnippetsModel->resetFile();
        }

        if ($this->userTextSnippView->formTextSubmit());
        {
            $text = $this->userTextSnippView->insertTextInTag();
            $this->UserSnippetsModel->addTextToFile($this->userTextSnippView->getFileContent(), $text);
        }
    }
}
