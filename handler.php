<?php

require('tools.php');

$tool = new Tools();

const CATEGORY_FILE = 'data/category.json';
const USER_FILE = 'data/user.json';
const CART_FILE = 'data/cart.json';


['page' => $page, 'bool' => $bool] = $tool->checkPage();

switch ($page) {
	case 'product':
		productHandler($bool);
		break;
	case 'category':
		categoryHandler($bool);
		break;
	case 'login':
		loginHandler($bool);
		break;
	case 'register':
		registerHandler($bool);
		break;
	case 'home':
		homeHandler($bool);
		break;
	case 'user':
		userHandler($bool);
		break;
	case 'cart':
		cartHandler($bool);
		break;
}

function cartHandler($bool) {
	global $tool;

	$data = $tool->fileTransformArray(CART_FILE);
	$cate_data = $tool->fileTransformArray(CATEGORY_FILE);
	$action = $_POST['action'];
	$return_data = array();

	if ($bool) {
		$arr = array();
		for ($i=0; $i<$data.length; $i++) {
			for ($j=0; $j<$cate_data.length; $j++) {
				if ($data[i]['product_id'] == $cate_data[$j]['product_id']) {
					array_push($arr, $cate_data[$j]);
				}
			}
		}
		$return_data['list'] = $arr;
		$return_data['status'] = 1;
		$return_data['msg'] = 'Successful';
	} else {
		if ($action == 'add') {
			$num = $_POST['num'];
			$price = $_POST['price'];
			$product_id = $_POST['product_id'];

			var_dump(in_array($data, $product_id));
			exit;

			if ($data.length > 0) {
				
			} else {

			}

			


		} elseif ($action == 'del') {
			$product_id = $_POST['product_id'];
		}
	}

	$return_data = json_encode($return_data);
	header('Content-Type:application/json;charset=utf-8');
	echo $return_data;
	exit;
}

function userHandler($bool) {
	global $tool;
	if ($bool) {
		$userid = $_GET['userid'];
		$action = $_GET['action'];

		if (isset($action)) {
			userActionHandler($userid);
		}

		if (!$userid) {
			$data = json_encode([
				'status' => 0,
				'msg' => 'Not User'
			]);
			header('Content-Type:application/json;charset=utf-8');
			echo $data;
			exit;
		}
		$data = $tool->fileTransformArray(USER_FILE);

		foreach($data as $k => $v) {
			if ($v['userid'] == $userid) {
				$v['status'] = 1;
				$v['msg'] = 'Successful';
				$data = json_encode($v);
				header('Content-Type:application/json;charset=utf-8');
				echo $data;
				exit;
			}
		}
	}
}

function userActionHandler($userid) {
	global $tool;
	$data = $tool->fileTransformArray(USER_FILE);
	foreach($data as $k => $v) {
		if ($v['userid'] == $userid) {

			$data[$k]['isVip'] = 1;
			$arr['list'] = $data;
			$arr = json_encode($arr);
			file_put_contents(USER_FILE, $arr);

			$v['status'] = 1;
			$v['msg'] = 'Successful';
			$data = json_encode($v);
			header('Content-Type:application/json;charset=utf-8');
			echo $data;
			exit;
		}
	}
}

function homeHandler($bool) {
	global $tool;
	if ($bool) {
		$data = $tool->fileTransformArray(CATEGORY_FILE);
		$data = json_encode($data);
		header('Content-Type:application/json;charset=utf-8');
		echo $data;
		exit;
	}
}

function productHandler($bool) {
	global $tool;
	if ($bool) {
		$product_id = $_GET['product_id'];
		$data = $tool->fileTransformArray(CATEGORY_FILE);

		foreach($data as $k => $v) {
			if ($v['product_id'] == $product_id) {
				$data = json_encode($v);
				header('Content-Type:application/json;charset=utf-8');
				echo $data;
				exit;
			}
		}
		
	}
}

function categoryHandler($bool) {
	global $tool;
	if ($bool) {
		$category_id = $_GET['category_id'];
		$data = $tool->fileTransformArray(CATEGORY_FILE);
		$arr = array();
		foreach ($data as $key => $value) {
			if ($category_id == $value['category_id']) {
				array_push($arr, $value);
			}
		}
		$data = json_encode($arr);
		header('Content-Type:application/json;charset=utf-8');
		echo $data;
		exit;
	}
}

function registerHandler($bool) {
	global $tool;
	if ($bool) {
		
	} else {
		$username = $_POST['username'];
		$password = $_POST['password'];
		if (!$username || !$password) {
			$data = json_encode(["status" => 0, "msg" => "Con not empty"]);
			header('Content-Type:application/json;charset=utf-8');
			echo $data;
			exit;
		}
		$user_data = $tool->fileTransformArray(USER_FILE);

		foreach ($user_data as $key => $value) {
			if ($username == $value['username']) {
				$data = json_encode(['status' => 0, 'msg' => 'User exist']);
				header('Content-Type:application/json;charset=utf-8');
				echo $data;
				exit;
			}
		}
		$time = time();
		
		array_push($user_data, [
			'username' => $username,
			'password' => $password,
			'isVip' => 0,
			'userid' => $time,
			'money' => 60000,
		]);

		$arr['list'] = $user_data;
		$arr = json_encode($arr);
		file_put_contents(USER_FILE, $arr);
		$data = json_encode([
			'userid' => $time,
			'status' => 1,
			'msg' => 'Successful'
		]);
		header('Content-Type:application/json;charset=utf-8');
		echo $data;
		exit;
	}
}

function loginHandler($bool) {
	global $tool;
	if ($bool) {

	} else {
		$username = $_POST['username'];
		$password = $_POST['password'];
		if (!$username || !$password) {
			$data = json_encode(["status" => 0, "msg" => "Can not empty"]);
			header('Content-Type:application/json;charset=utf-8');
			echo $data;
			exit;
		}

		$user_data = $tool->fileTransformArray(USER_FILE);

		foreach ($user_data as $key => $value) {
			if ($username == $value['username']) {
				$data = json_encode([
					'status' => 1,
					'msg' => 'Successful',
					'userid' => $value['userid'],
					'username' => $value['username']
				]);
				header('Content-Type:application/json;charset=utf-8');
				echo $data;
				exit;
			}
		}
		$data = json_encode([
			'status' => 0,
			'msg' => 'Error'
		]);
		header('Content-Type:application/json;charset=utf-8');
		echo $data;
		exit;
	}
}

?>