init();


// $('.star').attr('data-score', 3);
function init() {
	config.set_nav();

	config.login_status_refresh();

	set_content();
}

function cart_refresh(id) {
	config.order.del(id);
	setTimeout(() => {
		set_content();
	}, 300);
}



function price_handler(self, bool) {
	let id = self.getAttribute('data-id');

	let InputVal = $('#cart-' + id);
	let num = InputVal.val();
	let n = 0;

	if (bool) {
		InputVal.attr('value', ++num);
		n = 1;
	} else {
		num--;
		if (num <=0)num=0;
		InputVal.attr('value', num);
		n = -1;
	}
	config.order.add(id, n, 0);
	setTimeout(() => {
		set_content();
	}, 300);
}



function set_content() {
	let html = '';

	$.get('handler.php', {
		page: 'cart'
	}, function(res) {
		console.log(res);
		if (res.list || res.list.length < 1) return $('#cart-list1').html(html);
		let total = 0;
		for (var i=0; i<res.list.length; i++) {
			total += res.list[i].num * res.list[i].price;
			html += `<div class="row no-margin cart-item">
                <div class="col-xs-12 col-sm-2 no-margin">
                    <a href="#" class="thumb-holder">
                        <img class="lazy" alt="" src="${res.list[i].list.cover}" />
                    </a>
                </div>

                <div class="col-xs-12 col-sm-5 ">
                    <div class="title">
                        <a href="#">${res.list[i].list.title}</a>
                    </div>
                </div> 

                <div class="col-xs-12 col-sm-3 no-margin">
                    <div class="quantity">
                        <div class="le-quantity">
                            <form>
                                <a class="minus" data-id="${res.list[i].product_id}" onclick="price_handler(this, 0)" href="javascrip:void(0)"></a>
                                <input id="cart-${res.list[i].product_id}" name="quantity" readonly="readonly" type="text" value="${res.list[i].num}" />
                                <a class="plus" data-id="${res.list[i].product_id}" onclick="price_handler(this, 1)" href="javascrip:void(0)"></a>
                            </form>
                        </div>
                    </div>
                </div> 

                <div class="col-xs-12 col-sm-2 no-margin">
                    <div class="price">
                        ${res.list[i].price}
                    </div>
                    <a class="close-btn" onclick="cart_refresh(${res.list[i].product_id})" href="javascript:void(0);"></a>
                </div>
            </div>`;
		}

		$('#cart-all-price-1').html('$' + total);
		$('#cart-all-price-2').html('$' + total);

		$('#cart-list1').html(html);
		
	})


}