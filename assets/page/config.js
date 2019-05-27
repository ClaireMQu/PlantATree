const config = {
	host: 'platetree.herokuapp.com/',
	nav_list: [
		'Fruit tree',
		'Hedge',
		'Evergreen',
		'NZ native',
		'Gum tree',
		'Plam tree',
		'Hardwood',
		'GardenTools'
	],

	search() {
		let k = $('.search-field').eq(0).val();
		$.post('handler.php', {
			page: 'search',
			k,
		}, function (res) {
			if (res.status == 1) {
				let product_id = res.product_id;
				config.goPage('single-product.html?product_id=' + product_id)
			}
		})
	},

	GetQueryString(name) {
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
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
		this.goPage('login.html');
		this.login_status_refresh();
	},

	login_status_refresh() {
		let userid = localStorage.getItem('userid');
		let username = localStorage.getItem('username');
		let left_html = '';
		let right_html = '';

		if (!userid || !username) {
			left_html = '<li><a href="index.php">Main</a></li>';
			right_html = `<li><a href="register.html">Register</a></li>
                    <li><a href="login.html">Login</a></li>`;
		} else {
			left_html = `<li><a href="index.php">Main</a></li>
                <li><a href="cart.html">My Cart</a></li>
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
		        html += `<li class="checkout">
	                <div class="basket-item">
	                    <div class="row">
	                        <div class="col-xs-12 col-sm-6">
	                            <a href="cart.html" class="le-button inverse">My Cart</a>
	                        </div>
	                        <div class="col-xs-12 col-sm-6">
	                            <a href="checkout.html" class="le-button">Check Out</a>
	                        </div>
	                    </div>
	                </div>
	            </li>`;

	    		$('#cart-list').html(html);
		    } else {
		        $.get('handler.php', {
		            page: 'cart',
		            action: 'get',
		        }, function(res) {
		            console.log(res);
		            let len = res.list && res.list.length || 0;
		            let total = res.total || 0;
		            $('#cart-count').text(len);

		            
		            for (var i=0; i<len; i++) {
		            	total += res.list[i].num * res.list[i].price;
		                html += `<li>
		                    <div class="basket-item">
		                        <div class="row">
		                            <div class="col-xs-4 col-sm-4 no-margin text-center">
		                                <div class="thumb">
		                                    <img alt="" src="${res.list[i].list.cover}" />
		                                </div>
		                            </div>
		                            <div class="col-xs-8 col-sm-8 no-margin">
		                                <div class="title">${res.list[i].list.title}</div>
		                                <div class="price">￥${res.list[i].price}</div>
		                                <div class="price" style="color:#333;">x ${res.list[i].num}</div>
		                            </div>
		                        </div>
		                        <a class="close-btn" href="javascript:void(0)" onclick="config.order.del(${res.list[i].product_id})"></a>
		                    </div>
		                </li>`;
		            }

		            $('#cart-money').text(total + '.00');

		            html += `<li class="checkout">
		                <div class="basket-item">
		                    <div class="row">
		                        <div class="col-xs-12 col-sm-6">
		                            <a href="cart.html" class="le-button inverse">My Cart</a>
		                        </div>
		                        <div class="col-xs-12 col-sm-6">
		                            <a href="checkout.html" class="le-button">Check Out</a>
		                        </div>
		                    </div>
		                </div>
		            </li>`;

		    		$('#cart-list').html(html);
		        })
		    }
		},

		add(product_id, num, price) {
			let self = this;
			$.post('handler.php', {
				page: 'cart',
				action: 'add',
				product_id,
				num,
				price,
			}, function (res) {
				console.log(this);
				self.refresh();
			})
		},

		del(product_id) {
			let self = this;
			$.post('handler.php', {
				page: 'cart',
				action: 'del',
				product_id,
			}, function (res) {
				console.log(res);
				self.refresh();
			})
		}
	},

	set_nav() {
		let nav_list = this.nav_list;
		let tabledData = '';
		let $tableDom = $('#mc-horizontal-menu-collapse .navbar-nav');
		for (let i=0, len=nav_list.length; i<len; i++) {
			tabledData += `<li class="dropdown"><a href="category-grid.html?index=${i+1}">${nav_list[i]}</a></li>`;
		}
		$tableDom.html(tabledData);
	}
}