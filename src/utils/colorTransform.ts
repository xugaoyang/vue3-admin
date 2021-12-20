export const hexToRgb = (color: string) => {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
  color = color.toLowerCase()
  if (reg.test(color)) {
    if (color.length === 4) {
      let colorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    const colorChange = []
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)))
    }
    return 'RGB(' + colorChange.join(',') + ')'
  } else {
    return color
  }
}

export const rgbToHex = (color: string) => {
  const reg = /^(rgb|RGB)/
  if (reg.test(color)) {
    let strHex = '#'
    const colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
    for (let i = 0; i < colorArr.length; i++) {
      let hex = Number(colorArr[i]).toString(16)
      if (hex === '0') {
        hex += hex
      }
      strHex += hex
      return strHex
    }
  } else {
    return String(color)
  }
}

/**
 * 获取颜色灰度值
 * @param {String} color rgb格式
 * @param {Number} threshold 灰度阈值
 */
export const colorGrayLevel = (color: string, threshold: number) => {
  // 判断颜色的灰度值，值越小颜色越深 g = R*0.299 + G*0.587 + B*0.114
  const colorArr: any[] = color.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
  const g = colorArr[0] * 0.299 + colorArr[1] * 0.587 + colorArr[2] * 0.114

  if (g > threshold) {
    return 'shallow'
  }

  console.log('deep')
  return 'deep'
}
