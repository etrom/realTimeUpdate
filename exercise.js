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
        for (var i=0; i < 10; i++) {
            console.log(result.pages[i], i)
            myResults[result.pages[i].stats.people] = result.pages[i].title
        }
        var inputLeng = Object.keys(myResults).length

        this.data = result
        this.array = myResults;
        console.log(this.array)

        return this;
    },

    sortByKeys: function() {
        debugger;
        var input = this.array;
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
        var data = this.data;
        var items = document.createElement('div');
        items.setAttribute('id','items')

        Object.keys(array).reverse().forEach(function(v, i) {
            var item = document.createElement('div');
            item.setAttribute('class', 'item');
            item.addEventListener('click', function(){
              toggleRefStats(data.pages[i]);
            })
            items.appendChild(item);
            var visits = document.createElement('span');
            visits.setAttribute('class', 'visits');
            visits.innerHTML = v;
            item.appendChild(visits);
            var title = document.createElement('span');
            title.setAttribute('class', 'title');
            title.innerHTML = array[v].trim()
            item.appendChild(title)
        })
        this.itemsObj = items;
        return this;
    }

}

function toggleRefStats(data) {
    var statBox = document.getElementById('referrer-box')
    //if clicked define last click
    if(statBox !== null){
        var lastClicked = document.getElementsByClassName('referrer-for')[0].innerHTML.trim()
    }
    //if clicking the same item close it
    if( statBox !== null && lastClicked === data.title.trim()) {
        document.body.removeChild(statBox)
    //open new statbox
    } else {
        var items = document.getElementsByClassName('item');
        for(var i=0; i < items.length; i++) {
            var thisItem = items[i].getElementsByClassName('title')[0];
            if (thisItem.innerHTML === data.title.trim()) {
                var topRefsBox = document.createElement('div');
                topRefsBox.setAttribute('id', 'referrer-box');
                //if it already existed replace the old one
                if(statBox !== null) {
                    debugger;
                    document.body.replaceChild(topRefsBox, statBox);
                //create new one
                } else {
                    debugger;
                    document.body.appendChild(topRefsBox);
                }
                addRefheadings(data, topRefsBox);
                addRefElems(data, topRefsBox);
            }
        }

    }
}


function addRefheadings(data, topRefsBox){
    var referrals = document.createElement('span');
    referrals.setAttribute('class', 'num gray');
    referrals.innerHTML = 'referrals';
    var referralSite = document.createElement('span');
    referralSite.setAttribute('class', 'referrer gray');
    referralSite.innerHTML = 'referral site';
    var referrerFor = document.createElement('div');
    referrerFor.setAttribute('class', 'referrer-for');
    referrerFor.innerHTML = data.title.trim();
    var referrerInfo = document.createElement('div');
    referrerInfo.setAttribute('class', 'subheads');
    var refSub = document.createElement('div');
    refSub.innerHTML = 'Top 5 Referral Sites';
    refSub.setAttribute('class', 'ref-subhead');
    topRefsBox.appendChild(referrerFor);
    topRefsBox.appendChild(refSub)
    referrerInfo.appendChild(referrals);
    referrerInfo.appendChild(referralSite);
    topRefsBox.appendChild(referrerInfo);
}


function addRefElems(data, topRefsBox) {
    var array = data.stats.toprefs;
    var length;
    if (array.length < 5){
        length = array.length
    } else {
        length = 5;
    }
    for(var j= 0; j < length; j++) {
        var num = document.createElement('span');
        num.setAttribute('class', 'num');
        num.innerHTML = array[j].visitors;
        var referrer = document.createElement('span');
        referrer.setAttribute('class', 'referrer');
        referrer.innerHTML = array[j].domain;
        var referrerInfo = document.createElement('div')
        referrerInfo.setAttribute('class', 'referrer-info');
        referrerInfo.appendChild(num);
        referrerInfo.appendChild(referrer);
        topRefsBox.appendChild(referrerInfo);
    }
}