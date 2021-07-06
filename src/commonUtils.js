// common functions that will be used by across more than one mod

// maskStringInput a string used to hold all to be masked fields in the raw format
// obtained by nodeJS via an maskInput.txt input txt file. see server/maskInput.txt
//
const initializeMaskString = () => {
    var maskStringInput = "";
    return { 
        getMaskString: function() {
            return maskStringInput;
        },
        setMaskString: function(ms) {
            maskStringInput = ms;
        }
    };
}
let initFunc = initializeMaskString();
function getMaskStr() {
    return initFunc.getMaskString();
}
function setMaskStr(ms) {
    return initFunc.setMaskString(ms);
}

const getStringTokensToMask = () => {
     $.get({
            url: "http://localhost:8888/token",
            dataType: "text",
            success: function (result, status, xhr) {
               console.log('got success on data');
               var maskVals = result;
               setMaskStr(maskVals);
               maskItem(maskVals);
            },
            error: function (xhr, status, error) {
                alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
}

const establishStringsToMask = (itemsToMask) => {
    var resultArr = [];
    // strip out non single/double quoted entries from the itemsToMask input String
    // all to be masked strings are either single or dbl quoted, and deliminated by space or comma
    // it is assumed that to be masked string does not have commas but can have spaces
    //
    // will return a string of all dbl/sing quoted items, tossing out anything else
    //[\"\'"] look for " or '
    //\S immediately followed by non-white space char
    //[a-zA-Z0-9_ -] followed by any of these characters (notice space in this char set)
    // + any former found chars occurs 1 or more times
    // followed by ending " or '
    let allQuotedItems=itemsToMask.match(/([\"\']\S[a-zA-Z0-9_ -]+[\"\'])/g).toString(); 
    if (allQuotedItems && allQuotedItems.length) {

            // using this string as an example: 
            // testStr "\"Boston Red Sox\",\"Yankees\" \"Cubs\",\"Jays\" 'Bruins','Rangers'"
            var splitOnQuoteAndSpace=allQuotedItems.split(/[\"\']\s/);
            // with testStr we now have an array of 3 items, the split was on 
            // '\" ' - double quote and space OR
            // '\' ' - single quote and space
            // splitOnQuoteAndSpace will now reveal a value of
           /* // Array(3) [ "\"Boston Red Sox\",\"Yankees", "\"Cubs\",\"Jays", "'Bruins','Rangers'" ]
                    // 0: "\"Boston Red Sox\",\"Yankees"
​                    // 1: "\"Cubs\",\"Jays"
                    // 2: "'Bruins','Rangers'"
​              //length: 3 */
            //split on quote and space. doing another toString() and split 
            // so that all values are deliminated by a comma
            if (splitOnQuoteAndSpace && splitOnQuoteAndSpace.length) {
                    // move all array vals to a string and remove all single and double quotes
                    // splitOnQuoteAndSpace.toString()
                    //     results in: "\"Boston Red Sox\",\"Yankees,\"Cubs\",\"Jays,'Bruins','Rangers'"
                    // splitOnQuoteAndSpace.toString().replace(/\"|\'/g, '')
                    //     results in: "Boston Red Sox,Yankees,Cubs,Jays,Bruins,Rangers"
                    resultArr = splitOnQuoteAndSpace.toString().replace(/\"|\'/g, '').split(',')
            }       
    }
    else {
        console.log(`nothing to mask on string ${itemsToMask}`);
    }
    return resultArr;
}

// assumes itemsToMask will string based on req
// this function only purpose is to build an or'ed list of strings to mask
// i.e. 'pizza pie|111-22-333|terrorist'
const getOredMaskStr = (itemsToMask) => {
    let resultArr = establishStringsToMask(itemsToMask);
   
    let orResponseStr = '';
    // we have all to be masked strings established in resultArr. 
    // build the or'ing string used for RE contruction
    // using testStr this would look like Boston Red Sox|Yankees|Cubs|Jays|Bruins|Rangers
    resultArr.forEach((tokenToMask, idx, arr) => {
        orResponseStr += tokenToMask;
        if (idx != arr.length-1) {
             orResponseStr += "|";
        }
    });
    return orResponseStr;
}

// mask function - 
const  maskItem = (itemsToMask) => { 
    let textContent = $("textarea").val();
    let oredMaskStr = getOredMaskStr(itemsToMask);
    let reToApplyMask = new RegExp(oredMaskStr, 'g')

    // the replace function below will counter the number of chars in the matched item
    // designated as $1 and create that many X chars for the mask
    let updatedText = textContent.replace(reToApplyMask, function($1) { 
        let arr=$1.split(' '); 
        var resp=[]; 
        arr.forEach((item) => { 
            var itemLen=item.length; 
            var str = ''.padStart(itemLen, 'X'); 
            resp.push(str);
        }); 
        return(resp.join(' '));
    });
    console.log(`textContent is now ${updatedText}`);
    $("textarea").val(updatedText);
    $("#fieldsApplied").text(oredMaskStr);
}

export {maskItem, getStringTokensToMask}