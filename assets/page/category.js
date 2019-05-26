
init();


// $('.star').attr('data-score', 3);
function init() {
	set_nav();

    config.login_status_refresh();

	const cate_index = GetQueryString('index');
	$('#now-category').text(config.nav_list[cate_index-1]);

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
	let params = GetQueryString('index');
	
	$.get(config.host + 'handler.php', {
		category_id: params,
		page: 'category'
	}, function(res) {
		console.log(res);

		let html = '';
		let list_view = '';
		for (var i=0, len=res.length;i<len; i++) {
			html += `<div class="col-xs-12 col-sm-3 no-margin product-item-holder hover">
                            <div class="product-item">
                                <div class="ribbon red"><span>sale</span></div> 
                                <div class="image">
                                    <img alt="111" src="${res[i].cover}" />
                                </div>
                                <div class="body">
                                    <div class="title">
                                        <a href="single-product.html?product_id=${res[i].product_id}">${res[i].title}</a>
                                    </div>
                                </div>
                                <div class="prices">
                                    <div class="price-prev">￥${res[i].price}</div>
                                    <div class="price-current pull-right">￥${res[i].saleprice}</div>
                                </div>
                                <div class="hover-area">
                                    <div class="add-cart-button">
                                        <a href="single-product.html?product_id=${res[i].product_id}" class="le-button">Add to Chart</a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>`;

            list_view += `<div class="product-item product-item-holder">
                        <div class="ribbon red"><span>sale</span></div> 
                        <div class="row">
                            <div class="no-margin col-xs-12 col-sm-4 image-holder">
                                <div class="image">
                                    <img alt="" src="${res[i].cover}" />
                                </div>
                            </div><!-- /.image-holder -->
                            <div class="no-margin col-xs-12 col-sm-5 body-holder">
                                <div class="body">
                                    
                                    <div class="title">
                                        <a href="single-product.html?product_id=${res[i].product_id}">${res[i].title}</a>
                                    </div>
                                    <div class="excerpt">
                                        <p>${res[i].desc}</p>
                                    </div>
                                </div>
                            </div><!-- /.body-holder -->
                            <div class="no-margin col-xs-12 col-sm-3 price-area">
                                <div class="right-clmn">
                                    <div class="price-current">￥${res[i].saleprice}</div>
                                    <div class="price-prev">￥${res[i].price}</div>
                                    <div class="availability"><label>存货:</label><span class="${res[i].reserve ? 'available' : 'not-available'}">  ${res[i].reserve ? '现货' : '无货'}</span></div>
                                    <a class="le-button" href="single-product.html?product_id=${res[i].product_id}">Add to Chart</a>
                                </div>
                            </div>
                        </div>
                    </div>`;
		}
		$('.product-grid-holder>.row.no-margin').html(html);
		$('#list-view>.products-list').html(list_view);
	})
}


function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
     if(r!=null)return  unescape(r[2]); return null;
}