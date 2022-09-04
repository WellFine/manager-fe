/**
 * 工具函数封装
 */
export default {
  /**
   * 按指定规则格式化日期对象，返回格式化后的字符串
   * @param {Date} date 日期对象
   * @param {string} rule 格式化规则
   * @returns 格式化后的日期字符串
   */
  formateDate (date, rule) {
    let fmt = rule || 'yyyy-MM-dd hh:mm:ss'

    // 年份不放进 obj 中循环来替换，是因为会受到补零操作的影响，2022 => 22
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, date.getFullYear())

    const obj = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }

    for (const key in obj) {
      if (new RegExp(`(${key})`).test(fmt)) {
        const val = obj[key] + ''
        // ('00' + val).substring(val.length) 是一种补零的方法
        fmt = fmt.replace(RegExp.$1, ('00' + val).substring(val.length))
      }
    }

    return fmt
  }
}