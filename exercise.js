var cb = function(result) {
        for (var i=0; i < result.pages.length; i++){
            console.log(result.pages[i].stats.people, result.pages[i].title)
            var items = document.createElement('div')
            items.setAttribute('class', 'items')
            items.addEventListener('click', function(){
              openRefStats()
            })
            statsContainer.appendChild(items);
            var visits = document.createElement('span')
            visits.setAttribute('class', 'visits')
            visits.innerHTML = result.pages[i].stats.people
            items.appendChild(visits)
            var title = document.createElement('span')
            title.setAttribute('class', 'title')
            title.innerHTML = result.pages[i].title
            items.appendChild(title)

        }
        // window.setTimeout(function() {
        //   cbApi.getData(cb);
        // }, 5000);
      };
      cbApi.getData(cb);


var openRefStats= function() {
    console.log('open stats')
}