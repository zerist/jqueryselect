<!DOCTYPE html>
<html>
<head>
  <title> test </title>
  
</head>
<body>
  <ul id='ul1' name='ul' class='ul'>
    <li id='li1' name='li' class='li'><p>li</p></li>
    <li id='li2' name='li' class='li'><p id='p1' name='p' class='p'><a src='' class='a'>p</p></a></li>
  
    <li class='li'><img src='' class='img'/></li>
    <input type='text' disabled="disabled" />dasd
  <input type="password" />asdad
    </ul>
    <h1>sdad</h1>
    <h2>asdasd</h2>
    <h5>adasd</h5>
    <h5>asdasd</h5>
    
  <script type='text/javascript'>
    function mainloop(tmp_result, sel_type, word, word_type, attr_args){
        var result = []
        var attr = attr_args[0] || ''
        var value = attr_args[1] || ''
        var type = attr_args[2] || ''
        
        if(tmp_result.length == 0){
            if(sel_type == 'class_sel'){
                var elems = getByClass(document, word)
            }else if(sel_type == 'id_sel'){
                var elems = document.getElementById(word)
            }else{
                var elems = document.getElementsByTagName(word_type)
                if(sel_type == 'attr_sel'){
                    elems = getAttrElems(elems, attr, value, type)
                }
                if(word_type == 'input'){
                    elems = getInputElems(elems, 'input')
                }
            }
            tmp_result.push(elems)
        }else{
            
            for(var x=0, y=tmp_result.length; x<y; x++){
                var parentObjArray = tmp_result[0]
                var cls_elems = []
                for(var n=0; n<parentObjArray.length; n++){
                    var parentObj = parentObjArray[n]
                    if(sel_type == 'class_sel'){
                        var elems = getByClass(parentObj, word)
                    }else{
                        var elems = parentObj.getElementsByTagName(word_type)
                    }
                    if(word_type == 'input'){
                        elems = getInputElems(elems, word)
                    }
                    if(elems.length != 0){
                        for(var m=0; m<elems.length; m++){
                            cls_elems.push(elems[m])
                        }
                    }
                }
                if(sel_type == 'attr_sel'){
                    cls_elems = getAttrElems(parentObjArray, attr, value, type)
                }


                tmp_result.push(cls_elems)
                tmp_result.shift()
            }
        }
        return tmp_result
    }

    function index_loop(tmp_result, word, type){
        var hidden_elems = []
            if(tmp_result.length == 0){
                var parentObj = document
                var elems = parentObj.getElementsByTagName('*')
                if(word == 'hidden'){
                    for(var m=0; m<elems.length; m++){
                        if(elems[m].getAttribute('type') == 'hidden'){
                            hidden_elems.push(elems[m])
                        }
                    }
                }else if(word == 'visible'){
                    for(var m=0; m<elems.length; m++){
                        if(elems[m].getAttribute('type') != 'hidden'){
                            hidden_elems.push(elems[m])
                        }
                    }
                }
                if(type == 'eq'){
                    hidden_elems.push(elems[word])
                }else if(type == 'gt'){
                    while(word < elems.length){
                        hidden_elems.push(elems[word])
                        word++
                    }
                }else if(type == 'lt'){
                    while(word >= 0){
                        hidden_elems.push(elems[word])
                        word--
                    }
                }else if(type == 'contain'){
                    for(var m=0; m<elems.length; m++){
                        if(elems[m].textContent == word){
                            hidden_elems.push(elems[m])
                        }
                    }
                }else if(type == 'not'){
                    for(var m=0; m<elems.length; m++){
                        if(m != word){
                            hidden_elems.push(elems[m])
                        }
                    }
                }
                tmp_result.push(hidden_elems)
            }else{
                for(var x=0, y=tmp_result.length; x<y; x++){
                    var elemsArray = tmp_result[0]
                    if(word == 'hidden'){
                        for(var n=0; n<elemsArray.length; n++){
                            if(elemsArray[n].getAttribute('type') == 'hidden'){
                                hidden_elems.push(elemsArray[n])
                            }
                        }
                    }else if(word == 'visible'){
                        for(var n=0; n<elemsArray.length; n++){
                            if(elemsArray[n].getAttribute('type') != 'hidden'){
                                hidden_elems.push(elemsArray[n])
                            }
                        }
                    }
                    if(type == 'eq'){
                        hidden_elems.push(elemsArray[word])
                    }else if(type == 'gt'){
                        while(word < elemsArray.length){
                            hidden_elems.push(elemsArray[word])
                            word++
                        }
                    }else if(type == 'lt'){
                        while(word >= 0){
                            hidden_elems.push(elemsArray[word])
                            word--
                        }
                    }else if(type == 'contain'){
                        for(var n=0; n<elemsArray.length; n++){
                            if(elemsArray[n].textContent == word){
                                hidden_elems.push(elemsArray[n])
                            }
                        }
                    }else if(type == 'not'){
                        for(var m=0; m<elemsArray.length; m++){
                            if(m != word){
                                hidden_elems.push(elemsArray[m])
                            }
                        }
                    }
                    tmp_result.push(hidden_elems)
                    tmp_result.shift()
                }
            }
    }
    var $ = function(input){
        //result array for all the elem to return
        var result = []

        //some default args elems
        var word_type = '*'
        var attr_args = []

        //tokenize the input
        var words = tokenize(input)
        var tmp_words = tokenize(input)
        //check for error input
        if(check_word_end(words)){
            alert('error input in the end of word')
        }else{
            //for loop the words
            var tmp_result = []
            for(var i=0, j=words.length; i<j; i++){
                //$('*')
                var word = words[0]
                var sel_type = get_sel_type(word)
                if(sel_type == 'all_sel'){
                    mainloop(tmp_result, sel_type, word, word_type, attr_args)
                }
                
                //$('p')
                if(sel_type == 'elem_sel'){
                    if(word[0] == ' '){
                        var elem_tagname = word.substring(1, word.length)
                    }else{
                        var elem_tagname = word
                    }
                    word_type = elem_tagname
                    mainloop(tmp_result, sel_type, elem_tagname, word_type, attr_args)

                }

                //$('#id')
                if(sel_type == 'id_sel'){
                    var element_id = word.substring(1, word.length)
                    mainloop(tmp_result, sel_type, element_id, word_type, attr_args)
                }

                //$(':first')
                if(sel_type == 'index_sel'){
                    var index_word = word.substring(1, word.length)
                    var index_array = []
                    if(index_word == 'first'){
                        tmp_result.push(tmp_result[0][0])
                        tmp_result.shift()
                    }else if(index_word == 'last'){
                        tmp_result.push(tmp_result[0][tmp_result[0].length-1])
                        tmp_result.shift()
                    }else if(index_word == 'even'){
                        var even_elems = []
                        for(var x=0; x<tmp_result[0].length; x++){
                            if(x % 2 == 1){
                                even_elems.push(tmp_result[0][x])
                            }
                        }
                        tmp_result.push(even_elems)
                        tmp_result.shift()
                    }else if(index_word == 'odd'){
                        var odd_elems = []
                        for(var x=0; x<tmp_result[0].length; x++){
                            if(x % 2 == 0 ){
                                odd_elems.push(tmp_result[0][x])
                            }
                        }
                        tmp_result.push(odd_elems)
                        tmp_result.shift()
                    }else if(word.indexOf('>') != -1){

                        var index_exp = word.split('>')
                        var attr = index_exp[0]
                        var value = index_exp[1]
                        var cls_elems = []
                        if(tmp_result.length == 0){
                            var elems = document.children
                            for(var m=0; m<elems.length; m++){
                                if(elems[m].nodeName == value.toUpperCase()){
                                    cls_elems.push(elems[m])
                                }
                            }
                            tmp_result.push(cls_elems)
                        }else{
                            for(var x=0, y=tmp_result.length; x<y; x++){
                                var parentObjArray = tmp_result[0]
                                for(var n=0; n<parentObjArray.length; n++){
                                    var parentObj = parentObjArray[n]
                                    var elems = parentObj.children
                                    if(elems.length != 0){
                                        for(var m=0; m<elems.length; m++){
                                            if(elems[m].nodeName == value.toUpperCase()){
                                                cls_elems.push(elems[m])
                                            }
                                        }
                                    }
                                }
                                tmp_result.push(cls_elems)
                                tmp_result.shift()
                            }
                        }
                    }else if(word.indexOf('+') != -1){
                        var index_exp = word.split('+')
                        var attr = index_exp[0]
                        var value = index_exp[1]
                        var cls_elems = []
                        if(tmp_result.length == 0){
                            var elems = document.children
                            while(elems[0].nodeName == value.toUpperCase()){
                                cls_elems.push(elems[0])
                                elems.shift()
                            }
                            tmp_result.push(cls_elems)
                        }else{
                            for(var x=0, y=tmp_result.length; x<y; x++){
                                var parentObjArray = tmp_result[0]
                                for(var n=0; n<parentObjArray.length; n++){
                                    var parentObj = parentObjArray[n]
                                    while(parentObj.nextSibling.nodeName == value.toUpperCase()){
                                        parentObj = parentObj.nextSibling
                                        cls_elems.push(parentObj)
                                    }

                                }
                                tmp_result.push(cls_elems)
                                tmp_result.shift()
                            }
                        }
                    }else if(word.indexOf('~') != -1){
                        var index_exp = word.split('~')
                        var attr = index_exp[0]
                        var value = index_exp[1]
                        var cls_elems = []
                        if(tmp_result.length == 0){
                            var elems = document.children
                            while(elems[0].nodeName == value.toUpperCase()){
                                cls_elems.push(elems[0])
                                elems.shift()
                            }
                            tmp_result.push(cls_elems)
                        }else{
                            for(var x=0, y=tmp_result.length; x<y; x++){
                                var parentObjArray = tmp_result[0]
                                for(var n=0; n<parentObjArray.length; n++){
                                    var parentObj = parentObjArray[n]
                                    var sib_list = []
                                    while(parentObj.nextSibling){
                                        sib_list.push(parentObj.nextSibling)
                                    }
                                    for(var m=0; m<sib_list.length; m++){
                                        if(sib_list[m].nodeName == value.toUpperCase()){
                                            cls_elems.push(sib_list[m])
                                        }
                                    }

                                }
                                tmp_result.push(cls_elems)
                                tmp_result.shift()
                            }
                        }
                    }else if(index_word == 'header'){
                        var head_elems = []
                        var headName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
                        if(tmp_result.length == 0){
                            var elems = document.getElementsByTagName('*')
                            while(elems.length > 0){
                                for(var m=0; m<headName.length; m++){
                                    if(elems[0].nodeName == headName[m]){
                                        head_elems.push(elems[0])
                                    }
                                }

                                elems.shift()
                            }
                            tmp_result.push(head_elems)
                        }else{
                            for(var x=0, y=tmp_result.length; x<y; x++){
                                var parentObjArray = tmp_result[0]
                                for(var n=0; n<parentObjArray.length; n++){
                                    var parentObj = parentObjArray[n]
                                    var elems = parentObj.getElementsByTagName('*')
                                    for(var m=0; m<elems.length; m++){
                                        for(var p=0; p<headName.length; p++){
                                            if(elems[m].nodeName == headName[p]){
                                                head_elems.push(elems[m])
                                            }
                                        }
                                    }
                                }
                                tmp_result.push(head_elems)
                                tmp_result.shift()
                            }
                        }
                    }else if(index_word.indexOf('has') != -1){
                        var has_word = index_word.split('(')[1].split(')')[0]
                        tmp_words = tokenize(has_word)
                        var result = tmp_result[0]
                        var elems = [] 
                        for(var m=0; m<result.length; m++){
                            for(var n=0; n<tmp_words.length; n++){
                                var tmp_word = tmp_words[n]
                                var tmp_type = get_sel_type(tmp_word)
                                if(tmp_type == 'elem_sel'){
                                    word_type = tmp_word
                                }
                                console.log([tmp_word, tmp_type, word_type])
                                if(mainloop([[result[m]]], tmp_type, tmp_word, word_type, attr_args)[0].length != 0){
                                    elems.push(result[m])
                                }
                            }
                        }
                        tmp_result.push(elems)
                        tmp_result.shift()
                        
                        //for word mainloop              TODO
                    }else if(index_word.indexOf('contains') != -1){
                        var contain_word = index_word.split('(')[1].split(')')[0]
                        index_loop(tmp_result, contain_word, 'contain')
                    }else if(index_word.indexOf('eq') != -1){
                        var eq_word = index_word.split('(')[1].split(')')[0]
                        var type = 'eq'
                        index_loop(tmp_result, eq_word, type)

                    }else if(index_word.indexOf('lt') != -1){
                        var eq_word = index_word.split('(')[1].split(')')[0]
                        var type = 'lt'
                        index_loop(tmp_result, eq_word, type)
                    }else if(index_word.indexOf('gt') != -1){
                        var eq_word = index_word.split('(')[1].split(')')[0]
                        var type = 'gt'
                        index_loop(tmp_result, eq_word, type)
                    }else if(index_word.indexOf('not') != -1){
                        var eq_word = index_word.split('(')[1].split(')')[0]
                        var type = 'not'
                        index_loop(tmp_result, eq_word, type)
                    }else if(index_word == 'empty'){
                        var empty_elems = []
                        var elems = document.getElementsByTagName('*')
                        while(elems.length >0){
                            if(elems[0].getElementsByTagName('*').length == 0){
                                empty_elems.push(elems[0])
                            }
                            elems.shift()
                        }
                    }else if(index_word == 'hidden' || index_word == 'visible'){
                        index_loop(tmp_result, index_word, word_type)
                    }else if(index_word == 'input'){
                        mainloop(tmp_result, 'elem_sel', 'input', 'input', attr_args)
                    }else if(index_word == 'input' || index_word=='text' || index_word=='password' || index_word=='radio' || index_word=='checkbox' || index_word=='file' || index_word=='image' || index_word=='button' || index_word=='submit' || index_word=='reset'){
                        mainloop(tmp_result, sel_type, index_word, 'input', attr_args)
                    }else if(index_word == 'disabled'){
                        var attr_args = ['disabled', 'disabled', '=']
                        mainloop(tmp_result, 'attr_sel', index_word, word_type, attr_args)
                    }else if(index_word == 'enabled'){
                       var attr_args = ['disabled', 'disabled', '!=']
                        mainloop(tmp_result, 'attr_sel', index_word, word_type, attr_args)
                    }else if(index_word == 'selected'){
                        word_type = 'option'
                        var attr = 'selected'
                        var value = 'selected'
                        var type = '='
                        var attr_args = [attr, value, type]
                        mainloop(tmp_result, 'attr_sel', index_word, word_type, attr_args)
                    }else if(index_word == 'checked'){
                        word_type = 'radio'
                        var attr = 'checked'
                        var value = 'checked'
                        var type = '='
                        var attr_args = [attr, value, type]
                        var tmp1 = mainloop(tmp_result, 'attr_sel', index_word, word_type, attr_args)
                        word_type = 'checkbox'
                        var tmp2 = mainloop(tmp_result, 'attr_sel', index_word, word_type, attr_args)
                        var checked_elems = []
                        for(var m=0; m<tmp1.length; m++){
                            checked_elems.push(tmp1[m])
                        }
                         for(var m=0; m<tmp2.length; m++){
                            checked_elems.push(tmp2[m])
                        }
                        tmp_result.push(checked_elems)
                        tmp_result.shift()
                    }
                }
                if(sel_type == 'attr_sel'){
                    var attr_word = word.substring(1, word.length)
                    var value = ''
                    var attr = ''
                    var type = ''
                    if(attr_word.indexOf('=') == '-1'){
                        var attr_args = [attr_word, value, type]
                        mainloop(tmp_result, sel_type, attr_word, word_type, attr_args)
                    }else if(attr_word.indexOf('!=') != -1){
                        var attr_exp = attr_word.split('!=')
                        attr = attr_exp[0]
                        value = attr_exp[1]
                        type = '!='
                        var attr_args = [attr, value, type]
                        mainloop(tmp_result, sel_type, attr_word, word_type, attr_args)
                    }else if(attr_word.indexOf('$=') != -1){
                        var attr_exp = attr_word.split('$=')
                        attr = attr_exp[0]
                        value = attr_exp[1]
                        type = '$='
                        var attr_args = [attr, value, type]
                        mainloop(tmp_result, sel_type, attr_word, word_type, attr_args)
                    }else{
                        var attr_exp = attr_word.split('=')
                        attr = attr_exp[0]
                        value = attr_exp[1]
                        type = '='
                        var attr_args = [attr, value, type]
                        mainloop(tmp_result, sel_type, attr_word, word_type, attr_args)
                    }
                    
                }
                //$('.class')
                if(sel_type == 'class_sel'){
                    var cls_word = word.substring(1, word.length)
                    mainloop(tmp_result, sel_type, cls_word, word_type, attr_args)
                    
                }
                words.shift()

            }
            return tmp_result
            console.log(tmp_result)
            
        }
    }
    //console.log($('ul li>p'))

    
    
    function getAttrElems(elems, attr, value, type){
        var result = []
        if(type == '='){
            for(var i=0; i<elems.length; i++){
                if(elems[i].getAttribute(attr) == value){
                    result.push(elems[i])
                }
            }
        }else if(type == '!='){
            for(var i=0; i<elems.length; i++){
                if(elems[i].getAttribute(attr) != value){
                    result.push(elems[i])
                }
            }
        }else if(type == '$='){
            for(var i=0; i<elems.length; i++){
                var attr_value = elems[i].getAttribute(attr)
                if(attr_value.indexOf(value) == (attr_value.length - value.length)){
                    result.push(elems[i])
                }
            }
        }else{
            for(var i=0; i<elems.length; i++){
                if(elems[i].hasAttribute(attr)){
                    result.push(elems[i])
                }
            }
        }
        return result
    }

    function getByClass(parentObj ,clsName){
        var result = []
        var elemArray = parentObj.getElementsByTagName('*')
        for(var i=0; i<elemArray.length; i++){
            if(elemArray[i].className == clsName){
                result.push(elemArray[i])
            }
        }
        
        return result
    }

    
    function getInputElems(elems, type){
        var result = []
        if(type == 'input'){
            return elems
        }
        for(var i=0; i<elems.length; i++){
            if(elems[i].getAttribute('type') == type){
                result.push(elems[i])
            }
        }
        return result
    }

    function getHeadTag(parentObj){
        var result = []
        var h1 = parentObj.getElementsByTagName('h1')
        var h2 = parentObj.getElementsByTagName('h2')
        var h3 = parentObj.getElementsByTagName('h3')
        var h4 = parentObj.getElementsByTagName('h4')
        var h5 = parentObj.getElementsByTagName('h5')
        var h6 = parentObj.getElementsByTagName('h6')
        result = [h1, h2, h3, h4, h5, h6]
        for(var i=0, j=result.length; i<j; i++){
            if(result[0].length == 0){
                result.shift()
            }else{
                for(var n=0; n<result[0].length; n++){
                    result.push(result[0][n])
                }
                result.shift()
            }
        }
        return result
    }

    function get_sel_type(word){
        var type = ''
        if(word[0] == '.'){
            type = "class_sel"
        }else if(word[0] == '#'){
            type = "id_sel"
        }else if(word[0] == '*'){
            type = "all_sel"
        }else if(word[0] == ':' || word[0] == '>' || word[0] == '+' || word[0] == '~'){
            type = 'index_sel'
        }else if(word[0] == '['){
            type = 'attr_sel'
        }else{
            type = "elem_sel"
        }
        return type
    }

    function check_word_end(words){
        var punc_array = ['.', '#', '*', ':', ' ', '[']
        var word = words[words.length-1]
        var word_end = word[word.length-1]
        for(var i=0; i<punc_array; i++){
            if(word_end == punc_array[i]){
                return true
            }
        }
        return false
    }
    function tokenize(input){
        if(typeof input == 'object'){
            return input
        }
        var result =  input.match(/([\.|#|:|\[|\*|\s|\+|\>|\~]?)([\w|\d|!|=|$|\(|\)]*)/g)
        result.pop()

        for(var i=0; i<result.length; i++){
          var ll = result[i][0] || ''
          if(ll == '['){
            result.pop()
          }
        }
        return result

    }
    </script>
</body>
</html>
