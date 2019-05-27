<?php

require('tools.php');

$tool = new Tools();

const CATEGORY_FILE = 'data/category.json';
const USER_FILE = 'data/user.json';
const CART_FILE = 'data/cart.json';
const ORDER_FILE = 'data/order.json';


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
	case 'checkout':
		checkHandler($bool);
		break;
	case 'order':
		orderHandler($bool);
		break;
	case 'search':
		searchHandler($bool);
}

function searchHandler($bool) {
	global $tool;
	$k = $_POST['k'];

	$cate = $tool->fileTransformArray(CATEGORY_FILE);

	foreach ($cate as $key => $value) {
		if ($value['title'] == $k) {
			$return_data = json_encode([
				'status' => 1,
				'product_id' => $value['product_id']
			]);
			header('Content-Type:application/json;charset=utf-8');
			echo $return_data;
			exit;
			break;
		}
	}

	$return_data = json_encode([
		'status' => 0,
		'msg' => 'error',
	]);
	header('Content-Type:application/json;charset=utf-8');
	echo $return_data;
	exit;
}

function orderHandler($bool) {
	global $tool;

	if ($bool) {

	} else {
		$order_data = $tool->fileTransformArray(ORDER_FILE);

		$return_data = json_encode([
			'status' => 1,
			'msg' => 'ok',
			'data' => $order_data,
		]);
		header('Content-Type:application/json;charset=utf-8');
		echo $return_data;
		exit;
	}
}

function checkHandler($bool) {
	global $tool;

	$data = $tool->fileTransformArray(CART_FILE);
	$order_data = $tool->fileTransformArray(ORDER_FILE);


	
	if ($bool) {

	} else {
		$total = $_POST['total'];
		$kuaidi = $_POST['kuaidi'];

		$order = [
			'total' => $total,
			'kuaidi' => $kuaidi,
			'list' => $data,
		];

		array_push($order_data, $order);

		$arr['list'] = $order_data;
		$arr = json_encode($arr);
		$cart['list'] = array();
		$cart = json_encode($cart);
		file_put_contents(ORDER_FILE, $arr);
		file_put_contents(CART_FILE, $cart);

		$return_data = json_encode([
			'status' => 1,
			'msg' => 'Successful'
		]);
		header('Content-Type:application/json;charset=utf-8');
		echo $return_data;
		exit;
	}
}

function cartHandler($bool) {
	global $tool;

	$data = $tool->fileTransformArray(CART_FILE);
	$cate_data = $tool->fileTransformArray(CATEGORY_FILE);
	$action = $_POST['action'];
	$return_data = array();

	if ($bool) {
		$return_data['list'] = $data;
		$return_data['status'] = 1;
		$return_data['msg'] = 'Successful';
	} else {
		if ($action == 'add') {
			$num = $_POST['num'];
			$price = $_POST['price'];
			$product_id = $_POST['product_id'];
			$no_cart = 0;

			// 判断订单是否在购物车里面
			foreach ($data as $key => $value) {
				if ($value['product_id'] == $product_id) {
					$no_cart = 1;
					$n = $value['num'] + $num;
					if ($n <=0)$n=0;
					$data[$key]['num'] = $n;
					if ($price == 0) {
						$price = $value['price'];
					}
					$data[$key]['price'] = $price;
					break;
				}
			}

			// 没有相同订单，添加
			if (!$no_cart) {
				foreach ($cate_data as $key => $value) {
					if ($value['product_id'] == $product_id) {
						array_push($data, [
							'num' => $num,
							'price' => $price,
							'product_id' => $product_id,
							'list' => $value,
						]);
						break;
					}
				}
			}
			$arr['list'] = $data;
			$arr = json_encode($arr);
			file_put_contents(CART_FILE, $arr);

			$return_data = [
				'status' => 1,
				'msg' => 'Successful',
			];
		} elseif ($action == 'del') {
			$product_id = $_POST['product_id'];
			// var_dump($data);exit;
			foreach ($data as $key => $value) {
				if ($value['product_id'] == $product_id) {
					unset($data[$key]);
					$data = array_values($data);
					break;
				}
			}
			// var_dump($data);exit;
			$arr['list'] = $data;
			$arr = json_encode($arr);
			file_put_contents(CART_FILE, $arr);
			$return_data = [
				'status' => 1,
				'msg' => 'Successful'
			];
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
				'msg' => 'Error'
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
			$data = json_encode(["status" => 0, "msg" => "Can not empty"]);
			header('Content-Type:application/json;charset=utf-8');
			echo $data;
			exit;
		}
		$user_data = $tool->fileTransformArray(USER_FILE);

		foreach ($user_data as $key => $value) {
			if ($username == $value['username']) {
				$data = json_encode(['status' => 0, 'msg' => 'Exist']);
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
			'msg' => 'Sucessful'
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