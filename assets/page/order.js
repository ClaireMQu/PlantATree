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

function set_content() {
	let html = '';
	$.post('handler.php', {
		page: 'order',
	}, function(res) {
		console.log(res);
		

		for (var i=0; i<res.data.length; i++) {
			let item = '';
			for (var j=1; j<res.data[i].list.length; j++) {

				item += `<td style="text-align:left;vertical-align:top;padding-top:10px;padding-bottom:10px;border-right-width:0;border-right-style:solid;border-right-color:#E8E8E8;border-top-width:0;border-top-style:solid;border-top-color:#E8E8E8;padding-left:20px;" >
			              <div style="overflow:hidden;">
			                <a class="tp-tag-a" href="" style="float:left;width:27%;margin-right:2%;text-align:center;" target="_blank">
			                  <img src="${res.data[i].list[j].list.cover}" style="border:1px solid #E8E8E8;max-width:80px;">
			                </a>
			                <div style="float:left;width:71%;word-wrap:break-word;">
			                  <div style="margin:0px;">
			                    <a class="tp-tag-a" href="" target="_blank">
			                      <span>
			                        ${res.data[i].list[j].list.title}
			                      </span>
			                    </a>
			                    <span>
			                    </span>
			                  </div>
			                </div>
			              </div>
			            </td>
			            <td style="text-align:center;vertical-align:top;padding-top:10px;padding-bottom:10px;border-right-width:0;border-right-style:solid;border-right-color:#E8E8E8;border-top-width:0;border-top-style:solid;border-top-color:#E8E8E8;">
			            </td>
			            <td style="text-align:center;vertical-align:top;padding-top:10px;padding-bottom:10px;border-right-width:0;border-right-style:solid;border-right-color:#E8E8E8;border-top-width:0;border-top-style:solid;border-top-color:#E8E8E8;">
			            </td>
			            <td style="text-align:center;vertical-align:top;padding-top:10px;padding-bottom:10px;border-right-width:1px;border-right-style:solid;border-right-color:#E8E8E8;border-top-width:0;border-top-style:solid;border-top-color:#E8E8E8;" >
			            </td>
			            <td style="text-align:center;vertical-align:top;padding-top:10px;padding-bottom:10px;border-right-width:1px;border-right-style:solid;border-right-color:#E8E8E8;border-top-width:0;border-top-style:solid;border-top-color:#E8E8E8;" >
			            </td>
			            <td style="text-align:center;vertical-align:top;padding-top:10px;padding-bottom:10px;border-right-width:1px;border-right-style:solid;border-right-color:#E8E8E8;border-top-width:0;border-top-style:solid;border-top-color:#E8E8E8;" >
			            </td>`;
			}

			html += `<div style="margin-bottom:30px;">
			  <div class="trade-order-mainClose">
			    <div>
			      <table style="width:100%;border-collapse:collapse;border-spacing:0px;">
			        <colgroup>
			          <col style="width:38%;">
			          <col style="width:10%;">
			          <col style="width:5%;">
			          <col style="width:12%;">
			          <col style="width:12%;">
			          <col style="width:11%;">
			          <col style="width:12%;">
			        </colgroup>
			        <tbody>
			          <tr style="background-color:#F5F5F5;width:100%">
			            <td style="padding:10px 20px;text-align:left;">
			              <span>
			                Reference：
			              </span>
			              <span>
			              </span>
			              <span>
			                ${new Date().getTime() + parseInt(Math.random()*i*100)}
			              </span>
			            </td>
			            
			          </tr>
			        </tbody>
			      </table>
			      <table style="width:100%;border-collapse:collapse;border-spacing:0px;">
			        <colgroup>
			          <col style="width:38%;">
			          <col style="width:10%;">
			          <col style="width:5%;">
			          <col style="width:12%;">
			          <col style="width:12%;">
			          <col style="width:11%;">
			          <col style="width:12%;">
			        </colgroup>
			        <tbody>
			          <tr>
			            <td style="text-align:left;vertical-align:top;padding-top:10px;padding-bottom:10px;border-right-width:0;border-right-style:solid;border-right-color:#E8E8E8;border-top-width:0;border-top-style:solid;border-top-color:#E8E8E8;padding-left:20px;" >
			              <div style="overflow:hidden;">
			                <a class="tp-tag-a" href="" style="float:left;width:27%;margin-right:2%;text-align:center;" target="_blank">
			                  <img src="${res.data[i].list[0].list.cover}" style="border:1px solid #E8E8E8;max-width:80px;">
			                </a>
			                <div style="float:left;width:71%;word-wrap:break-word;">
			                  <div style="margin:0px;">
			                    <a class="tp-tag-a" href="" target="_blank">
			                      <span>
			                        ${res.data[i].list[0].list.title}
			                      </span>
			                    </a>
			                    <span>
			                    </span>
			                  </div>
			                </div>
			              </div>
			            </td>
			            <td style="text-align:center;vertical-align:top;padding-top:10px;padding-bottom:10px;border-right-width:0;border-right-style:solid;border-right-color:#E8E8E8;border-top-width:0;border-top-style:solid;border-top-color:#E8E8E8;">
			              <div style="font-family:verdana;font-style:normal;">
			                <p>
			                  <del style="color:#9C9C9C;">
			                    ${res.data[i].list[0].list.saleprice}
			                  </del>
			                </p>
			                <p>
			                  ${res.data[i].list[0].price}
			                </p>
			                <span>
			                </span>
			                <span>
			                </span>
			              </div>
			            </td>
			            <td style="text-align:center;vertical-align:top;padding-top:10px;padding-bottom:10px;border-right-width:0;border-right-style:solid;border-right-color:#E8E8E8;border-top-width:0;border-top-style:solid;border-top-color:#E8E8E8;">
			              <div>
			                <div>
			                  ${res.data[i].list[0].num}
			                </div>
			              </div>
			            </td>
			            <td style="text-align:center;vertical-align:top;padding-top:10px;padding-bottom:10px;border-right-width:1px;border-right-style:solid;border-right-color:#E8E8E8;border-top-width:0;border-top-style:solid;border-top-color:#E8E8E8;" >
			              <div>
			                <div style="font-family:verdana;font-style:normal;">
			                  <span>
			                  </span>
			                  <span>
			                  </span>
			                  <p>
			                    <strong>
			                      $${res.data[i].total}
			                    </strong>
			                  </p>
			                  <span>
			                  </span>
			                </div>
			                <p>
			                  <span>
			                    (Fee：
			                  </span>
			                  <span>
			                    $${res.data[i].kuaidi}
			                  </span>
			                  <span>
			                  </span>
			                  <span>
			                  </span>
			                  <span>
			                    )
			                  </span>
			                </p>
			                
			                <div>
			                </div>
			              </div>
			            </td>
			            <td style="text-align:center;vertical-align:top;padding-top:10px;padding-bottom:10px;border-right-width:1px;border-right-style:solid;border-right-color:#E8E8E8;border-top-width:0;border-top-style:solid;border-top-color:#E8E8E8;" >
			              <div>
			                <div style="margin-bottom:3px;">
			                  <a class="tp-tag-a" href="" target="_blank">
			                    Successful
			                  </a>
			                </div>
			              </div>
			            </td>
			          </tr>

			          ${item}
			        </tbody>
			      </table>
			      <div>
			      </div>
			    </div>
			  </div>
			</div>`;
		}



		$('#container1').html(html);
	})

	
}




