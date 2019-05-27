
init();


// $('.star').attr('data-score', 3);
function init() {
	set_nav();

    config.login_status_refresh();

	set_content();
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


function set_content() {
	let userid = config.GetQueryString('userid');
	if (!userid) return config.goPage('login.html');

	$.get('handler.php', {
		userid,
		page: 'user'
	}, function(res) {
		console.log(res);
		if (!res.status) return config.msg.error(res.msg);
		$('#user-id').text(res.userid);
		$('#username').text(res.username);
		$('#user-money').text(res.money);
		$('#is-vip').text(res.isVip ? 'VIP' : 'Normal');
		if (res.isVip) {
			$('#user-vip').css('display', 'none');
		}
	})
}

function user_vip() {
	let userid = config.GetQueryString('userid');
	$.get('handler.php', {
		userid,
		page: 'user',
		action: 'vip',
	}, function(res) {
		console.log(res);
		if (!res.status) return config.msg.error(res.msg);
		
		set_content();
	});
}



