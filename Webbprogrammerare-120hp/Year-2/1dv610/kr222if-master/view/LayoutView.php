<?php

namespace view;

class LayoutView {
  
  public function render($isLoggedIn, $pg, DateTimeView $dtv, UsersTextSnippetsView $utsv) : void {
    echo '<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Login Example</title>
        </head>
        <body>
          <h1>Assignment 2</h1>
          ' . $this->renderLink() . '
          ' . $this->renderIsLoggedIn($isLoggedIn) . '
          <div class="container">
              ' . $utsv->generateUploadFormHTML($isLoggedIn, $this->getRegisterView()) . '
              ' . $pg->response() . '
              ' . $dtv->show() . '
          </div>
         </body>
      </html>
    ';
  }

  private function renderIsLoggedIn($isLoggedIn) : string {
    if ($isLoggedIn) {
      return '<h2>Logged in</h2>';
    } else {
      return '<h2>Not logged in</h2>';
    }
  }

  public function getRegisterView() : bool {
    return isset($_GET['register']);
  }
  
  private function renderLink() {
    if ($this->getRegisterView()) {
      return '<a href="?">Back to login</a>';
    } else {
      return '<a href="?register">Register a new user</a>';
    }
  }

}
