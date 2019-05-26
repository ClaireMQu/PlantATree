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

function addto_cart() {
	let product_id = GetQueryString('product_id');
	let num = $('#shop-num').val();
	let price = $('#price-current').val();
	config.order.add(product_id, num, price);
}

function set_content() {
	let params = GetQueryString('product_id');
	let is_vip = localStorage.getItem('is_vip') || 0;
	
	$.get(config.host + 'handler.php', {
		product_id: params,
		page: 'product'
	}, function(res) {
		console.log(res);
		
		$('.availability .available').html(res.reserve ? 'In Stock' : 'Sold Out');
		$('.title>a').text(res.title);
		$('.excerpt>p').text(res.desc);

		if (is_vip) {
			$('.price-current').text('$'+res.saleprice);
			$('.price-prev').text('$'+res.price);
		} else {
			$('.price-current').text('$'+res.price);
			$('.price-prev').css('display', 'none');
		}
		

		$('.img-responsive').attr('src', res.cover);
		$('.horizontal-thumb > img').attr('src', res.small_img);
		$('#description').html(res.content);
		$('#additional-info .tabled-data li .value').eq(0).text(res.obj.weight);
		$('#additional-info .tabled-data li .value').eq(1).text(res.obj.Guarantee);
		$('#additional-info .tabled-data li .value').eq(2).text(res.obj.color);
		$('#additional-info .tabled-data li .value').eq(3).text(res.obj.dimensions);
		$('#additional-info .tabled-data li .value').eq(4).text(res.obj.size);

		$('#addto-cart').attr('class', res.reserve ? 'le-button huge' : 'le-button huge disabled');
		$('#addto-cart').onclick = function() {
			if (res.reserve) {

			}
		}
		let html = '';
		for (var i=0, len=res.comment.length;i<len; i++) {
			html += `<div class="comment-item">
                            <div class="row no-margin">
                                <div class="col-lg-1 col-xs-12 col-sm-2 no-margin">
                                    <div class="avatar">
                                        <img alt="avatar" src="assets/images/default-avatar.jpg">
                                    </div>
                                </div>

                                <div class="col-xs-12 col-lg-11 col-sm-10 no-margin">
                                    <div class="comment-body">
                                        <div class="meta-info">
                                            <div class="author inline">
                                                <a href="#" class="bold">${res.comment[i].name}</a>
                                            </div>
                                            <div class="star-holder inline">
                                                <div class="star" data-score="4"></div>
                                            </div>
                                            <div class="date inline pull-right">
                                                ${res.comment[i].time}
                                            </div>
                                        </div>
                                        <p class="comment-text">
                                            ${res.comment[i].content}
                                        </p>
                                    </div>

                                </div>

                            </div>
                        </div>`;
		}
		$('#reviews .comments').html(html);
		$('#shop-num').text(`Items detail (${res.comment.length})`);
	})
}


function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
     if(r!=null)return  unescape(r[2]); return null;
}