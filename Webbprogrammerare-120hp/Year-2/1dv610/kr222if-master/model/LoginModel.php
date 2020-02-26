<?php

namespace model;

//  We'll pretend this is the database.

class LoginModel {
    public function validateLogin($userCredentials) : bool {
        if ($userCredentials->getUsername() == "Admin" && $userCredentials->getPassword() == "Password") {
            return true;
        } else {
            return false;
        }
    }
}