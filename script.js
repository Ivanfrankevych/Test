$('body').on('click', '.create_product', function () {
	$('.pop_up').addClass('active');
});
$('body').on('click', '.create_cart', function () {
	$('.pop_ups').addClass('active');
});
$('body').on('click', '.tabs p:nth-child(1)', function () {
	$('.product').removeClass('hide');
});
$('body').on('click', '.tabs p:nth-child(2)', function () {
	$('.product:not(.single_cart)').removeClass('hide');
	$('.product.single_cart').addClass('hide');
});
$('body').on('click', '.tabs p:nth-child(3)', function () {
	$('.product:not(.single_cart)').addClass('hide');
	$('.product.single_cart').removeClass('hide');
});
let id_product;
let id_cart;
let ids = [];
//BX24.callMethod(
//	"crm.product.property.add", {
//		fields: {
//			"ACTIVE": "Y",
//			"IBLOCK_ID": "4",
//			"NAME": "Включає",
//			"DEFAULT_VALUE": {
//				"TYPE": "html",
//				"TEXT": "none"
//			},
//			"USER_TYPE_SETTINGS": {
//				"HEIGHT": 300
//			},
//			"USER_TYPE": "HTML",
//			"PROPERTY_TYPE": "S"
//		}
//	},
//	function (result) {
//		if (result.error())
//			console.error(result.error());
//		else
//			console.dir(result.data());
//	}
//);
$('body').on('click', '.create', function () {
	let name = $('#name').val();
	let price = $('#price').val();
	let promise = new Promise(function (resolve, reject) {

		BX24.callMethod(
			"crm.product.add", {
				fields: {
					"NAME": name,
					"CURRENCY_ID": "RUB",
					"PRICE": price,
				}
			},
			function (result) {
				if (result.error()) {
					console.error(result.error());
				} else {
					console.info("Создан новый товар с ID " + result.data());
					id_product = result.data();
				}
				resolve();
			}
		);
	});
	promise.then(
		function () {
			console.log(id_product);
			$('.products').append('<div class="product" id="' + id_product + '"><div><h2>' + $('#name').val() + '</h2><p>' + $('#desc').val() + '</p><i>' + $('#price').val() + '</i></div></div>');
			$('.pop_up').removeClass('active');
			ids.push(id_product);
			console.log(ids);
			$('#name,#desc,#price').val('');
		}
	);
});
$('body').on('click', '.creates', function () {
	let products_ar = [];
	let name = $('#names').val();
	let price = $('#prices').val();
	let products = $('.product .active');
	for (let i = 0; i < products.length; i++) {
		products_ar.push($(products[i]).parents('.product').attr('id'));
	}
	let own_property = products_ar.toString();
	console.log(own_property);
	let promise = new Promise(function (resolve, reject) {
		BX24.callMethod(
			"crm.product.add", {
				fields: {
					"NAME": name,
					"CURRENCY_ID": "RUB",
					"PRICE": price,
					"PROPERTY_118": own_property,
				}
			},
			function (result) {
				if (result.error()) {
					console.error(result.error());
				} else {
					console.info("Созданa новый с ID " + result.data());
					id_cart = result.data();
				}
				resolve();
			}
		);
	});
	promise.then(
		function () {
			console.log(id_cart);
			console.log(products_ar);
			$('.products').append('<div class="product single_cart" "><div><h2>' + $('#names').val() + '</h2><p>' + $('#descs').val() + '</p><i>' + $('#prices').val() + '</i></div></div>');
			$('#names,#descs,#prices').val('');
			$('.pop_ups').removeClass('active');
			$('.product').removeClass('active');
		}
	);
});
$('body').on('click', '.buy', function () {
	let price_lead = 0;
	let products = $('.product .active');
	for (let i = 0; i < products.length; i++) {
		price_lead += parseInt($(this).find('i').text());
	}
	console.log(price_lead);
	//	BX24.callMethod(
	//		"crm.lead.add", {
	//			fields: {
	//				"TITLE": "Lead",
	//				"NAME": "name",
	//				"SECOND_NAME": "SECOND_NAME",
	//				"LAST_NAME": "LAST_NAME",
	//				"STATUS_ID": "NEW",
	//				"OPENED": "Y",
	//				"ASSIGNED_BY_ID": 1,
	//				"CURRENCY_ID": "USD",
	//				"OPPORTUNITY": 12500,
	//				"PHONE": [{
	//					"VALUE": "555888",
	//					"VALUE_TYPE": "WORK"
	//				}]
	//			},
	//			params: {
	//				"REGISTER_SONET_EVENT": "Y"
	//			}
	//		},
	//		function (result) {
	//			if (result.error())
	//				console.error(result.error());
	//			else
	//				console.info("Создан лид с ID " + result.data());
	//		}
	//	);
	BX24.callMethod(
		"crm.lead.fields", {},
		function (result) {
			if (result.error())
				console.error(result.error());
			else
				console.dir(result.data());
		}
	);
	BX24.callMethod(
		"crm.deal.fields", {},
		function (result) {
			if (result.error())
				console.error(result.error());
			else
				console.dir(result.data());
		}
	);
});
$('body').on('click', '.product:not(.single_cart) div', function () {
	$(this).toggleClass('active');
});
