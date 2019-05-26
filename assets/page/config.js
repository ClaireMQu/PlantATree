const config = {
	host: 'http://localhost/',
	nav_list: [
		'Fruit tree',
		'Hedge',
		'Evergreen',
		'NZ native',
		'Gum tree',
		'Plam tree',
		'Hardwood'
	],

	GetQueryString(name) {
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
	     if(r!=null)return  unescape(r[2]); return null;
	},

	msg: {
		success: (text) => {
			let total = `<div class="total-success">${text}</div>`;
			$('body').append(total);
			setTimeout(() => {
				$(".total-success").remove();
			}, 1500)
		},

		error: (text) => {
			let total = `<div class="total-error">${text}</div>`;
			$('body').append(total);
			setTimeout(() => {
				$(".total-error").remove();
			}, 1500)
			
		},

		warning: (text) => {
			let total = `<div class="total-warning">${text}</div>`;
			$('body').append(total);
			setTimeout(() => {
				$(".total-warning").remove();
			}, 1500)
		}
	},

	goPage(url, bool=0) {
		if (bool) {
			window.open(url);
		} else {
			window.location.href = url;
		}
	},

	setLocal(userid, username, is_vip) {
		localStorage.setItem('userid', userid);
		localStorage.setItem('username', username);
		localStorage.setItem('is_vip', is_vip);
	},

	removeLocal() {
		localStorage.removeItem('userid');
		localStorage.removeItem('username');
		localStorage.removeItem('is_vip');
	},

	logout() {
		this.removeLocal();
		this.goPage(this.host + 'login.html');
		this.login_status_refresh();
	},

	login_status_refresh() {
		let userid = localStorage.getItem('userid');
		let username = localStorage.getItem('username');
		let left_html = '';
		let right_html = '';

		if (!userid || !username) {
			left_html = '<li><a href="index.html">Main</a></li>';
			right_html = `<li><a href="register.html">Register</a></li>
                    <li><a href="login.html">Login</a></li>`;
		} else {
			left_html = `<li><a href="index.html">Main</a></li>
                <li><a href="cart.html?userid=${userid}">My Chart</a></li>
                <li><a href="orders.html?userid=${userid}">My Order</a></li>
                <li><a href="user.html?userid=${userid}">Me</a></li>`;

            right_html = `Hi, Welcome Back ${username} , <a onclick="config.logout()" href="javascript:void(0);">Log Out</a>`;
		}

		$('#header-left').html(left_html);
		$('#header-right').html(right_html);

		this.order.refresh();
		
	},

	order: {
		self: this,
		
		refresh() {
			let userid = localStorage.getItem('userid'),
		        username = localStorage.getItem('username');
		    let html = '';
		    if (!userid || !username) {
		        
		    } else {
		        $.get(config.host + 'handler.php', {
		            page: 'cart',
		            action: 'get',
		        }, function(res) {
		            console.log(res);
		            let len = res.list && res.list.length || 0;
		            let total = res.total || 0;
		            $('#cart-count').text(len);
		            $('#cart-money').text(total);
		            for (var i=0; i<len; i++) {
		                html += `<li>
		                    <div class="basket-item">
		                        <div class="row">
		                            <div class="col-xs-4 col-sm-4 no-margin text-center">
		                                <div class="thumb">
		                                    <img alt="" src="${res.list[i].cover}" />
		                                </div>
		                            </div>
		                            <div class="col-xs-8 col-sm-8 no-margin">
		                                <div class="title">item_1</div>
		                                <div class="price">￥${res.list[i].price}</div>
		                            </div>
		                        </div>
		                        <a class="close-btn" href="config.order.delete(${res.list[i].title})"></a>
		                    </div>
		                </li>`;
		            }
		        })
		    }

		    html += `<li class="checkout">
		                <div class="basket-item">
		                    <div class="row">
		                        <div class="col-xs-12 col-sm-6">
		                            <a href="javascript:void(0)" class="le-button inverse">My Chart</a>
		                        </div>
		                        <div class="col-xs-12 col-sm-6">
		                            <a href="javascript:void(0)" class="le-button">Check out</a>
		                        </div>
		                    </div>
		                </div>
		            </li>`;

		    $('#cart-list').html(html);
		},

		add(product_id, num, price) {
			console.log(this);
			$.post('handler.php', {
				page: 'cart',
				action: 'add',
				product_id,
				num,
				price,
			}, function (res) {
				console.log(res);
			})
		},

		delete(product_id) {

		}
	}
}