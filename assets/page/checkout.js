init();


// $('.star').attr('data-score', 3);
function init() {
	config.set_nav();

	config.login_status_refresh();

	set_content();
}

function onclickBtn(num) {
	switch (num) {
		case 1:
			totals(10);
			break
		case 2:
			totals(17);
			break
		case 3:
			totals(2);
			break;
		default:
			totals(0);
			break;
	}
}

function submit_order() {
	let total = $('#shop-total-n').html().substr(1);
	let radio = $("input[name='group1']:checked").val();
	$.post('handler.php', {
		total: parseInt(total),
		kuaidi:  Number(radio),
		page: 'checkout',
	}, function (res) {
		console.log(res);
		config.goPage('orders.html');
	})
}

function totals(kd) {
	let total = $('#shop-total-n').html().substr(1);
	console.log(11111, total, kd)
	$('#order-n-num1').text('$' + (parseInt(total) + Number(kd)) +'.00');
}

function set_content() {
	let html = "";
	$.get('handler.php', {
		page: 'cart'
	}, function(res) {
		console.log(res);
		let total = 0;
		let t_total = 0;
		for (var i=0; i<res.list.length; i++) {
			total += res.list[i].num * res.list[i].price;

			html += `<div class="row no-margin order-item">
                        <div class="col-xs-12 col-sm-1 no-margin">
                            <a href="#" class="qty">${res.list[i].num} x</a>
                        </div>

                        <div class="col-xs-12 col-sm-9 ">
                            <div class="title"><a href="#">${res.list[i].list.title}</a></div>
                        </div>

                        <div class="col-xs-12 col-sm-2 no-margin">
                            <div class="price">$${res.list[i].price}</div>
                        </div>
                    </div>`;


		}

		$('#order-list-n').html(html);
		let radio = $("input[name='group1']:checked").val();
		t_total = Number(total) + Number(radio);
		$('#shop-total-n').html('$' + total +'.00');
		setTimeout(() => {
			totals(17);
		}, 300);
		
	})
}