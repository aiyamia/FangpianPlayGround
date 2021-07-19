$(document).ready(function () {
  $(document).on('keydown', function (e) {
    if (e.ctrlKey || macKeys.cmdKey) 
      $(document.body).css("cursor", "pointer");
      var s = window.getSelection();
      s.removeAllRanges();//取消选择
      $("#card").remove();
  });
  $(document).on('keyup', function (e) {
    if (!e.ctrlKey || !macKeys.cmdKey) 
      $(document.body).css("cursor", "initial");
      
  });
  $(document.body).bind('mouseup', async function (e) {
    if (e.ctrlKey || macKeys.cmdKey) {
      var s;
      if (window.getSelection) {
        s = window.getSelection();
      } else if (document.selection) {
        s = document.selection.createRange();
      }
      var range = s.getRangeAt(0);
      var node = s.anchorNode;
      while (range.startOffset > 0 && /[a-zA-Z]/.test(range.toString()[0])) {
        range.setStart(node, (range.startOffset - 1));
      }
      if (range.startOffset != 0)
        range.setStart(node, range.startOffset + 1);
      do {
        range.setEnd(node, range.endOffset + 1);
      }
      while (/[a-zA-Z]/.test(range.toString().slice(-1)));
      range.setEnd(node, range.endOffset - 1);
      var word = range.toString().trim();
      if (word != '') {
        $card = await getCardNode(word);
        $card.css({
          "top": e.pageY,
          "left": e.pageX
        });
      }
    }
  });
  const getCardNode = async(word)=>{
    const data = await fetchData(word);
    $card = $('<div id="card"></div>');
    $pron = $('<div class="pronunciation"></div>');
    $mean = $('<div class="meaning"></div>');
    data.meaning.forEach(element => {
      const mean_str = element.ps+ " " + element.exp.join("；");
      $mean.append( `<p>${mean_str}</p>` );
    });
    $pron.append( `/${data.pronunciation.BrE}/` );
    $card.append($pron);
    $card.append($mean);
    return $card;
  };
  const fetchData = async(word)=>{
    let response = await fetch(`https://dictweb.translator.qq.com/api/elementary?word=${word}`);
    let result = await response.json();
    console.log(result);
    let data = {
      meaning:result.oxford_dict_info.abstract,
      pronunciation:result.oxford_dict_info.ph_json
    };
    return data;
  };
});
