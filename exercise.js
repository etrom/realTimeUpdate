var cb = function(result) {
        for (var i=0; i < result.pages.length; i++){
            console.log(result.pages[i].stats.people, result.pages[i].title)
        }
        // window.setTimeout(function() {
        //   cbApi.getData(cb);
        // }, 5000);
      };
      cbApi.getData(cb);