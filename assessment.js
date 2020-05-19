'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供を全て削除
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllchildren(element) {
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }
}
userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) { //名前がからの時は処理を終了
        return;
    }
    
    //todo 診断結果表示エリア作成
    //todo tweetエリアの作成
    removeAllchildren(tweetDivided);
   removeAllchildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    +encodeURIComponent('あなたのいいところ')
    +'&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'http://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};
const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声はみんなを引きつけます。',
'{userName}のいいところは眼差しです。{userName}に見つめられた人は気になって仕方がありません。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさが物事を成功に導きます。',
'{userName}のいいところは知識です。{userName}を多くの人がたよりにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しませます。',
'{userName}のいいところは用心深さです。{userName}の洞察に多くの人が助けられます。',
'{userName}のいいところは見た目です。{userName}の良さに皆が気を引かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気にかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことはみんなが共感しています。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えにみんなが感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えはとても魅力的です。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。しっかりと衝動を抑えられる{userName}はとても素晴らしい'
/*'{username}のいいところは優しさです。{username}の優しい雰囲気や立ち振る舞いに多くの人が癒されています。'*/
];
/**
 * 名前の文字列を渡すと診断結果を返す
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName){
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++){
        sumOfCharCode += userName.charCodeAt(i);
    }
    //文字コード番号の合計を回答数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);
    return result;
}
console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '正しくない'
);
