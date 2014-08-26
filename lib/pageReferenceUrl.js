'use strict';

var hashFile = require('./hashFile');
var fs = require('fs');
var util = require('util');
var path = require("path");

exports.pageReferenceUrl = function (filePath,fileText) {
    /**
     * fileText 当前路径文本文件内容
     * @type {String}
     */

    var getUrlArrayByJsonString = function (str) {
        if (!str) {
            return [];
        }
        var result = [];
        var arrKeyvalue = str.split(',');
        for (var i = 0; i < arrKeyvalue.length; i++) {
            var keyValue = arrKeyvalue[i].split(':');
            result.push(arrKeyvalue[i][1].replace(/['/"]/g,''));
        }
        ;
        return result;
    }
    /**
     * [getStringByCharFlag 根据开始字符和结束字符找出截取中间的文本
     * @param  {String} strContext  要找的字符串
     * @param  {String} startChar  开始字符
     * @param  {String} endChar    截止字符
     * @return {String}            截取的字符
     */
    var getStringByCharFlag = function (strContext, startChar, endChar) {
        if (!strContext) {
            return null;
        }
        var startIndex = strContext.indexOf(startChar);
        //startIndex +1 目的为了避免开始和截止字符重复
        var endIndex = strContext.indexOf(endChar, startIndex + 1);
        if (startIndex > -1 && endIndex > -1) {
            return strContext.slice(startIndex, endIndex + 1);
        } else {
            return null;
        }
    };

    /**
     * [getURLsByScript 根据page中的Script标签提取src的路径]
     * @return {Array} 文件路径的URL
     */
    var getURLsByScript = function () {
        if(!fileText){
            return [];
        }
        /**
         * Regex 获取page中的Script 标签内容
         * @type {RegExp}
         */
        var reg = /<script[^>]*>.*(\s{0,9})(<\/script>|\/>)/gi
        var arrScript = fileText.match(reg);
        var arrScriptUrl = [];
        for (var i = 0; i < arrScript.length; i++) {
            /*
             clear  scripts src of java code
             */
            reg = /<%([^%>]+)?%>/g;
            var script = arrScript[i].replace(reg, "");
            /*
             取得src="url" 的位置
             */
            reg = /src\s{0,1}=\s{0,1}['\"]?(['\"])/
            var srcUrl = script.match(reg)
            if (srcUrl) {

                var strHTML = script.slice(srcUrl.index);
                var urlString = getStringByCharFlag(strHTML, srcUrl[1], srcUrl[1]);
                arrScriptUrl.push(urlString.replace(/['\"]/g,''));

            }

        }

        return arrScriptUrl;

    }
    /**
     * 根据定义的别名得到文件的URL
     * @return {Array} 文件路径的URL
     */
    var getURLsByalias = function () {
        var aliasValue = "var aliasHash";
        var valIndex = fileText.indexOf(aliasValue)

        var strHTML = fileText.toString().slice(valIndex);
        var urlString = getStringByCharFlag(strHTML, '{', '}');
        return getUrlArrayByJsonString(urlString);

    };
    var getPageReferenceScript = function () {

        var scriptUrls = getURLsByScript();
        var aliasUrl = getURLsByalias();
        return scriptUrls.concat(aliasUrl);

    }
    var checkRepeat= function (urls){

    };
    return getPageReferenceScript();


};