<?php


class Tools {

	// 判断是 get 还是 post
	public function isMethod() {
		$method = $_SERVER['REQUEST_METHOD'];
		return $method == "POST" ? true : false;
	}

	// check page
	public function checkPage() {
		if ($this->isMethod()) {
			return ['page' => $_POST['page'], 'bool' => false];
		} else {
			return ['page' => $_GET['page'], 'bool' => true];
		}
	}

	// file transform array
	public function fileTransformArray($file) {
		$json_string = file_get_contents($file);
		$data = json_decode($json_string, true);
		return $data['list'];
	}
}