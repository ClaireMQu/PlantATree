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
	let $tableDom = $('.yamm.megamenu-horizontal .nav');
	for (let i=0, len=nav_list.length; i<len; i++) {
		tabledData += `<li class="dropdown menu-item"><a href="category-grid.html?index=${i+1}">${nav_list[i]}</a></li>`;
	}
	$tableDom.html(tabledData);
}

function set_content() {
	$.get(config.host + 'handler.php', {
		page: 'home'
	}, function(res) {
		console.log(res);

		let html = '';
		for (var i=0, len=res.length;i<len; i++) {
			html += `<div class="col-sm-4 col-md-3  no-margin product-item-holder hover">
                            <div class="product-item">
                                <div class="ribbon red"><span>sale</span></div> 
                                <div class="image">
                                    <img alt="" src="assets/images/blank.gif" data-echo="${res[i].cover}" />
                                </div>
                                <div class="body">
                                    <div class="label-discount green">-50% sale</div>
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
		}
		$('#featured .product-grid-holder').html(html);
	})
}