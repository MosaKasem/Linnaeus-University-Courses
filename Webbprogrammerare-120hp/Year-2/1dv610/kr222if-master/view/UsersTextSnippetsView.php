<?php

namespace view;

class UsersTextSnippetsView
{
    private static $textLength 		=	'UsersTextSnippetsView::TextLength';
    private static $messageId 		=	'UsersTextSnippetsView::Message';
    private static $text        	= 	'UsersTextSnippetsView::Text';
    private static $submitBtn   	= 	'UsersTextSnippetsView::SubmitBtn';

    private $message;
    private $filename;
    private $MAX_TEXT_SNIPPETS = 50;

    public function __construct($fn)
    {
        $this->message = "";
        $this->filename = $fn;
    }

    public function generateUploadFormHTML($isLoggedIn, $registerUrl) : string
    {
        if ($registerUrl)
        {
            return '';
        }
        if ($isLoggedIn)
        {
		return '
            <form  method="post" >
                <p id="' . self::$messageId . '">' . $this->getMessage() . '</p>
                <p id="' . self::$textLength . '">Theres room for ' . $this->getTextSnippetLength() . ' more letters</p>
                <input type="text" name="' . self::$text . '" value="" />
                <input type="submit" name="' . self::$submitBtn . '" value="Click" />
                <h3>text-snippet wall!</h3>
                <div>' . '<ul>' . trim($this->getFileContent()) . '</ul>' . '</div>
			</form>
        ';
        }
        {
            return '<p>Login to leave your text-snippet on the wall!<p>';
        }
    }

    public function resettingTextSnippetWall() : void
    {
        $this->message = "Resetting text-snippet wall!";
    }
    public function setMessage($msg) : void
    {
        $this->message = $msg;
    }
    public function getMessage() : string
    {
        return $this->message;
    }

    public function formTextSubmit() : bool
    {
        return isset($_POST[self::$submitBtn]) ? true : false;
    }
    
    public function getTextInput() : string
    {
        if (isset($_POST[self::$text]))  
        {
            return $_POST[self::$text];
        } else {
            return "";
        }
    }

    public function getFileContent() : string
    {
        $file = file_get_contents($this->filename);
        return $file;
    }

    public function insertTextInTag()
    {
        return $this->validateInput($this->getTextInput());
    }

    public function validateInput($input)
    {
        if (empty($input) || $input == "")
        {
            $this->setMessage("Can't submit an empty field! Write something!");
        } else if (preg_match('/[^A-Za-z0-9]/', $input)) {
            $this->setMessage("The field only accepts word or numbers!");
         } else if (strlen($input) > $this->getTextSnippetLength()) {
            $this->setMessage("You Wrote " . strlen($this->getTextInput()) . " letters, exceeding the limit of " . $this->getTextSnippetLength() . " letters left");
         } else {
            return "<li>" . $input . "</li>";
        }
    }

    public function textSnippetMaxLimit()
    {
        $file = strip_tags($this->getFileContent());
        if ($file) {
            return strlen($file) >= $this->MAX_TEXT_SNIPPETS;
        }
    }
    public function getTextSnippetLength() : int
    {
        return $this->MAX_TEXT_SNIPPETS - strlen(strip_tags($this->getFileContent()));
    }
    public function getMaxLimitValue() : int
    {
        return $this->MAX_TEXT_SNIPPETS;
    }

}