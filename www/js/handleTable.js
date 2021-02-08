var handleTable={
    addReview: function(resName, resType, dateVisit, avgPrice, serRate, cleanRate, foodRate, notes, reporter){
        handleDb.db.transaction(
            function(tx){
                tx.executeSql(
                    "insert into review(resName, resType, dateVisit, avgPrice, serRate, cleanRate, foodRate, notes, reporter) values(?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [resName, resType, dateVisit, avgPrice, serRate, cleanRate, foodRate, notes, reporter],
                    function(tx, results){
                        
                    },
                    function(tx, error){
                        console.log("add review error: " + error.message);
                    }
                );
            },
            function(error){},
            function(){}
        );
    },
    loadReviews: function(displayReviews){
        handleDb.db.readTransaction(
            function(tx){
                tx.executeSql(
                    "select * from review",
                    [],
                    function(tx, results){
                        displayReviews(results);
                    },
                    function(tx, error){
                        console.log("Error while selecting reviews" + error.message);
                    }
                );
            }
        );
    },
    deleteReview:function(_id){
        handleDb.db.transaction(
            function(tx){
                tx.executeSql(
                    "delete from review where _id = ?",
                    [_id],
                    function(tx, results){},
                    function(tx, error){
                        console.log("Error happen when deleting: " + error.message);
                    }
                );
            }
        );
    },
    updateReview: function(_id, newNotes){
        handleDb.db.transaction(
            function(tx){
                tx.executeSql(
                    "update review set notes = ? where _id = ?",
                    [newNotes, _id],
                    function(tx, result){},
                    function(tx, error){
                        console.log("Error updating review" + error.message);
                    }
                );
            }
        );
    }
    };