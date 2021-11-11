/**
 * @description 检查`a:1;b:2;c:3;`类型字符串是否有某个key,有则删除对应的key:value
 * @param {string} str 字符串
 * @param {string} checkStr  检查重复性字符
 * @param {string} splitSymbol 分隔符
 */
export const uniqString = (str, checkStr, splitSymbol) => {
  const isLastSysmbol = str.charAt(str.length - 1) === splitSymbol
  str = isLastSysmbol ? str.slice(0, str.length - 1) : str
  const arr = str.split(splitSymbol)
  arr.forEach((item, index) => {
    if(item.includes(checkStr)) {
      arr.splice(index, 1)
    }
  })
  return isLastSysmbol ? `${arr.join(splitSymbol)}${splitSymbol}` : arr.join(splitSymbol)
}

/**
 * @description 检查`--systemColor:#EE4F12;--textColor:#000; --systemColor:#EE4F12;--textColor:#000;`类型字符串是否有某个key,有则删除对应的key:value
 * @param {string} str 字符串
 * @param {string} checkStr  检查重复性字符
 */
export const uniqStringByReg = (str, checkStr) => {
  // 指定匹配色的字符长度
  const reg = new RegExp(checkStr + ':(.{4,7};)', 'g')
  const res = str.replace(reg, '')
  return res
}