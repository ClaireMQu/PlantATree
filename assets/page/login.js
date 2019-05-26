init();


// $('.star').attr('data-score', 3);
function init() {
	set_nav();

	config.login_status_refresh();
}



function set_nav() {
	let nav_list = config.nav_list;
	let tabledData = '';
	let $tableDom = $('#mc-horizontal-menu-collapse .navbar-nav');
	for (let i=0, len=nav_list.length; i<len; i++) {
		tabledData += `<li class="dropdown"><a href="category-grid.html?index=${i+1}">${nav_list[i]}</a></li>`;
	}
	$tableDom.html(tabledData);
}

// login start
function loginBtn() {
	let username = $('#username').val();
	let password = $('#password').val();
	if (!username || !password) {
		config.msg.warning('Can not empty');
		return
	}
	$.post(config.host + 'handler.php', {
		username,
		password,
		page: 'login',
	}, function(res) {
		if (!res.status) return config.msg.warning(res.msg);
		config.msg.success(res.msg);
		config.setLocal(res.userid, res.username);
		config.goPage(config.host + 'index.html');
	});
}

// register start
function registerBtn() {
	let username = $('#username').val();
	let password = $('#password').val();
	if (!username || !password) {
		config.msg.warning('Can not empty');
		return
	}
	$.post(config.host + 'handler.php', {
		username,
		password,
		page: 'register',
	}, function(res) {
		if (!res.status) return config.msg.warning(res.msg);
		config.msg.success(res.msg);
		config.goPage(config.host + 'login.html');
	});
}