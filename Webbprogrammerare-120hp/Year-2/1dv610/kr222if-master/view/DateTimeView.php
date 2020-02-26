<?php

namespace view;

class DateTimeView {


	public function show() : string {
		// configuring date settings
		date_default_timezone_set('Europe/Stockholm');

		// l : day, 
		// j : 1-31, 
		// S : 1th-31th, 
		// F : month, 
		// Y : Year.
		// H : hour,
		// i : minutes, 
		// s : seconds.
		
		$timeString = date('l') . ", the ". date('jS') ." of " . date('F Y');
		$timeString .= ", The time is " . date('H:i:s');

		return '<p>' . $timeString . '</p>';
	}
}