<?php

namespace model;

class UsersTextSnippetModel
{
    private $filenameForTextSnippets;
    function __construct()
    {
        $this->filenameForTextSnippets = 'uploadedContent.txt';
    }

    public function addTextToFile($file, $text) : void
    {
        $file .= $text;
        file_put_contents($this->filenameForTextSnippets, $file);
    }

    public function getFileName() : string
    {
        return $this->filenameForTextSnippets;
    }
    public function resetFile() : void
    {
        file_put_contents($this->filenameForTextSnippets, '');
    }
}