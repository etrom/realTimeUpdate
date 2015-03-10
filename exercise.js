var cb = function(result) {
    var container = document.getElementById('statsContainer');
    var oldItems = document.getElementById('items');
    var iObj;
    if (oldItems === null) {
        iObj = allMyFunctions.fetchData(result).sortByKeys().createDom().itemsObj;
        container.appendChild(iObj)
    } else {
        iObj= allMyFunctions.fetchData(result).sortByKeys().createDom().itemsObj;
        container.replaceChild(iObj, oldItems);
    }
    window.setTimeout(function() {
        cbApi.getData(cb);
    }, 5000);
};

cbApi.getData(cb);

var allMyFunctions = {
    array:{},
    data:{},
    itemsObj:{},

    fetchData: function(result) {
        var items =  document.getElementById('items');
        var myResults = {};
        for (var i=0; i < result.pages.length; i++) {
            myResults[result.pages[i].stats.people] = result.pages[i].title
        }
        this.data = myResults;

        return this;
    },

    sortByKeys: function() {
        var input = this.data;
        var arraykeys=[];
        for(var k in input) {arraykeys.push(k);}
        arraykeys.sort();

        var newArray=[];
        for(var i=arraykeys.length-1; i>=0; i--) {
            newArray[arraykeys[i]] = input[arraykeys[i]];
        }
        this.array = newArray;
        return this;
    },

    createDom: function() {
        var array = this.array;
        var datas = this.data;


        var items = document.createElement('div');
        items.setAttribute('id','items')

        Object.keys(array).reverse().forEach(function(v, i) {
            console.log(v, array[v] + ' hey');
            var item = document.createElement('div');
            item.setAttribute('class', 'item');
            item.addEventListener('click', function(){
                debugger;
              this.openRefStats(datas.pages[i].stats.toprefs);
            })
            items.appendChild(item);
            var visits = document.createElement('span');
            visits.setAttribute('class', 'visits');
            visits.innerHTML = v;
            item.appendChild(visits);
            var title = document.createElement('span');
            title.setAttribute('class', 'title');
            title.innerHTML = array[v]
            item.appendChild(title)
        })
        this.itemsObj = items;
        return this;
    },

    openRefStats:function(array) {
        console.log('top refs', array )
    }

}