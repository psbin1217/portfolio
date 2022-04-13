$(function () {

	/*----네비게이션 부드러운 스크롤----*/
	let targetPos = $(window).height();
	//console.log(ht);
	$(".gnb li a").click(function () {
		let target = $(this).attr("href");
		let targetPos = $(target).offset().top;
		console.log(target);
		console.log(targetPos);
		$("html,body").stop().animate({ scrollTop: targetPos }, 1000);
		$(".gnb li a").removeClass("active");
		$(this).addClass("active");
	});

	/*-----------Artwork 슬라이드-------------*/
	var location = 0;
	var leftSlide;
	var slidewidth = $(".art_list li").width()
	$(window).resize(function () {
		slidewidth = $(".art_list li").width()
	});
	$(".page").eq(0).addClass("on");
	$(".a_prev").addClass("off")
	$(".a_next").click(function () {
		location++;
		if (location >= 3) { location = 3 }
		leftMove();
		$(".arrow").removeClass("off")
		if (location == 3) {
			$(".a_next").addClass("off")
		}
	});
	$(".a_prev").click(function () {
		location--;
		if (location < 0) { location = 0 }
		leftMove();
		$(".arrow").removeClass("off")
		if (location == 0) {
			$(".a_prev").addClass("off")
		}
	});
	$(".page").click(function () {
		location = $(this).index();
		$(".page").removeClass("on");
		$(this).addClass("on");
		leftMove();
		return false;
	});
	function leftMove() {
		leftSlide = (slidewidth * location) * -1;
		$(".art_list").stop().animate({ left: leftSlide });
		$(".page").removeClass("on");
		$(".page").eq(location).addClass("on");
	}


	/*--------------About Me_Skill 그래프-------------*/
	$(window).scroll(function () {
		var aboutTop = $("#about").offset();
		var per;
		for (var i = 0; i < 4; i++) {
			per = $(".gr").eq(i).find(".num").text()
			if ($(window).scrollTop() >= aboutTop.top) {
				$(".gr").eq(i).find(".bar").stop().animate({ height: per })
			} else {
				$(".gr .bar").stop().animate({ height: "0" })
			}
		}
	});

	/*----------portfolio cont 색상변화------------*/
	$('.portfolio .content').hover(function () {
		conId = $(this).attr('id')
		console.log(conId)
		$(this).find('.img_box').css({ filter: 'grayscale(0%)' })
	}, function () {
		$(this).find('.img_box').css({ filter: 'grayscale(100%)' })
	});


	/*-----------------팝업-----------------*/
	/*Artwork img*/
	$(".art_list li .art_area .mask").click(function () {
		var li = $(this).parents(".art_list li").index();
		var n = $(this).parents(".art_area").index();
		console.log(li);
		console.log(n);
		$(".art_pop").show();
		$(".art_pop").find(".pop img").attr("src", "./images/artwork" + (li + 1) + "_" + (n + 1) + ".jpg");
		$("html").css({ overflow: "hidden" });
		return false
	});

	/*portfolio mobile*/
	$(".btn_mobile").click(function () {
		//e.preventDefault();
		let i = $(this).parents(".content").index();
		let url = $(".portfolio .content").eq(i).find("iframe").attr("href");
		console.log(url);
		$(".mobile").show();
		$(".mobile").find("iframe").attr("src", url);
		$("html").css({ overflow: "hidden" });
		return false
	});


	/*portfolio 디자인가이드*/
	$(".btn_guide").click(function () {
		var j = $(this).parents(".content").index();
		console.log(j);
		$(".guide").show();
		$(".guide").find(".pop img").attr("src", "images/guide" + (j + 1) + ".jpg");
		$("html").css({ overflow: "hidden" });
		return false
	});

	/*팝업 close 버튼*/
	$(".btn_close").click(function () {
		$(".overlay").hide();
		$("html").css({ overflow: "auto" });
	});

	/*-------------Top 스크롤 퍼센트(javascript)------------*/
	window.onload = function () {//마지막에넣으면 이거 안해두됨
		const progressBar = document.querySelector(".progress");
		const progresstext = document.querySelector(".progress p");
		const bodyTag = document.querySelector("body");

		document.addEventListener("scroll", () => {
			// pageYO= 낮은버전도 고려함
			// pageY = 낮은버전고려안함
			let pixels = window.scrollY; //픽셀로반환해줌
			let pageHeight = bodyTag.getBoundingClientRect().height;
			//bodyTag.offsetHeight를 써도 됨
			//console.log(pageHeight); 
			let totalHeight = pageHeight - window.innerHeight;
			//console.log(totalHeight);
			let percent = pixels / totalHeight;
			//console.log(percent);
			progressBar.style.width = `${100 * percent}%` //100*percent+"%"

			if (pixels > 0) {
				progresstext.innerHTML = `${Math.floor(100 * percent)}%`;
			} else {
				progresstext.innerHTML = "";
			}
		});

		let aboutShow = document.querySelector(".about_wrap")

		window.addEventListener('scroll', function () {
			let aboutY = window.scrollY;
			console.log("scrollY", aboutY);

			if (aboutY < 4100) {
				aboutShow.style.animation = "aboutBack 2s ease-out forwards";
			} else {
				aboutShow.style.animation = "about 3s";
			}
		});
	}/*------------------반응형 nav-----------------*/
	$(".nav_btn").click(function () {
		$(".nav").css({ left: "0" });
		clearInterval(timer);
	});

	$(".close_btn").click(function () {
		$(".nav").css({ left: "-80%" });
		timer = setInterval(fadeInOut, 4000);
	});

	$(".nav .gnb>li").click(function () {
		$(".nav").css({ left: "-80%" });
		timer = setInterval(fadeInOut, 4000);
	});

	/*-----------------top menu-------------------*/

	$(window).scroll(function () {
		let Top = $(document).scrollTop();
		$(".topTxt").text(Top);
		// console.log(Top);
		if (Top >= 1000) {
			$("#scrolltop").fadeIn();
		} else {
			$("#scrolltop").fadeOut();
		}
	});

	$("#scrolltop").click(function () {
		$("html,body").stop().animate({ scrollTop: 0 }, 1000);
	});


	/*------------sub_nav---------------*/

	$(window).scroll(function () {
		var top = $(document).scrollTop();
		console.log(top);
		if (top > 0 && 16 >= top) {
			$(".sub_nav .gnb li:nth-of-type(1) .block").css({ left: "-10px" });
			$(".sub_nav .gnb li:nth-of-type(2) .block").css({ left: "-100px" });
			$(".sub_nav .gnb li:nth-of-type(3) .block").css({ left: "-100px" });
			$(".sub_nav .gnb li:nth-of-type(4) .block").css({ left: "-100px" });
		} else if (top > 17 && 3432 >= top) {
			$(".sub_nav .gnb li:nth-of-type(1) .block").css({ left: "-100px" });
			$(".sub_nav .gnb li:nth-of-type(2) .block").css({ left: "-10px" });
			$(".sub_nav .gnb li:nth-of-type(3) .block").css({ left: "-100px" });
			$(".sub_nav .gnb li:nth-of-type(4) .block").css({ left: "-100px" });
		} else if (top > 3433 && 4825 >= top) {
			$(".sub_nav .gnb li:nth-of-type(1) .block").css({ left: "-100px" });
			$(".sub_nav .gnb li:nth-of-type(2) .block").css({ left: "-100px" });
			$(".sub_nav .gnb li:nth-of-type(3) .block").css({ left: "-10px" });
			$(".sub_nav .gnb li:nth-of-type(4) .block").css({ left: "-100px" });
		} else if (top > 4826) {
			$(".sub_nav .gnb li:nth-of-type(1) .block").css({ left: "-100px" });
			$(".sub_nav .gnb li:nth-of-type(2) .block").css({ left: "-100px" });
			$(".sub_nav .gnb li:nth-of-type(3) .block").css({ left: "-100px" });
			$(".sub_nav .gnb li:nth-of-type(4) .block").css({ left: "-10px" });
		}
	});
});




