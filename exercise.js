var cb = function(result) {
    var items =  document.getElementById('items');
    if (typeof(items) == 'undefined' || items == null) {
      var items = document.createElement('div');
        items.setAttribute('id','items')
        var container = document.getElementById('statsContainer')
        container.appendChild(items)
    }
    var myResults = {}
    for (var i=0; i < result.pages.length; i++) {
        console.log(result.pages)
        myResults[result.pages[i].stats.people] = result.pages[i].title
    }
    var sorted = sortByKeys(myResults)

    Object.keys(sorted).reverse().forEach(function(v, i) {
        console.log(v, sorted[v] + ' hey');
        var items =  document.getElementById('items');
        var item = document.createElement('div');
        item.setAttribute('class', 'item');
        item.addEventListener('click', function(){
          openRefStats(result.pages[i].stats.toprefs);
        })
        items.appendChild(item);

        var visits = document.createElement('span');
        visits.setAttribute('class', 'visits');
        visits.innerHTML = v;
        item.appendChild(visits);
        var title = document.createElement('span');
        title.setAttribute('class', 'title');
        title.innerHTML = sorted[v]
        item.appendChild(title)

    });
    window.setTimeout(function() {
        var items = document.getElementById('items')
        while (items.firstChild) {
            items.removeChild(items.firstChild);
        }
        cbApi.getData(cb);
    }, 5000);
};
    cbApi.getData(cb);


function sortByKeys(input) {
    // debugger;
  var arraykeys=[];
  for(var k in input) {arraykeys.push(k);}
  arraykeys.sort();

  var newArray=[];
  for(var i=arraykeys.length-1; i>=0; i--) {
      newArray[arraykeys[i]]=input[arraykeys[i]];
  }
  return newArray;
}

var openRefStats= function(i) {
}

//load dom elements
// update dom on callback
// update numbers
// change positions