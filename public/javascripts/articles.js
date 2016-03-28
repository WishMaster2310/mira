$(function() {

	var $grid = $('.c-posts__list');
	

	$grid.masonry({
	  itemSelector: '.c-posts__item',
	  columnWidth: 300,
	  fitWidth: true,
	  gutter: 10
	});

	function createPostView (data) {
		var elem = document.createElement('a');
		var img = new Image;
		elem.className = 'c-posts__item';

		var content = [
			'<a class="c-posts" href="'+ data.url +'"><div class="c-posts__title">' + data.title +'</div>'
		];
		if (data.img) {
			img.src = '/uploads/' + data.img;
			content.push('<div class="c-posts__imgbox"><img class="c-posts__img" src="' + img.src + '" /></div>')
		}
		content.push('<div class="c-posts__text">' + data.text +'</div></a>');
		elem.innerHTML = content.join("");
		return elem
	};

	function loadMorePosts ()  {
		$.getJSON('/uploads/posts.json', function(data) {
			var $posts;
			var posts = [];

			if (data.length === 0) {
				$('.c-posts__loadmore').hide()
				return
			}

			$.each(data, function(indx, val) {
				posts.push(createPostView (val))
			});

			$posts = $(posts);
			$grid.append($posts).masonry('appended', $posts);
		});
	} 

	$('.c-posts__loadmore').on('click', function(e) {
		e.preventDefault();
		loadMorePosts ()
	})
});