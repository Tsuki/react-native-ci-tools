const common = require('./common')

/*
 * Parse .plist files into DOM
 */
function parse (err, plist) {
  return new Promise((resolve, rejected) => {
    if (err) {rejected(err)}
    resolve(plist)
  })
}

module.exports = (plist, fileObj) => new Promise(async (resolve, reject) => {
  try {
    common.throwIfNotObject(plist, 'Provided plist parser is not object')
    common.throwIfNotFuction(plist.parse, 'Provided plist do not have parse (parse()) function')
    const content = await plist(fileObj.content, await parse)
    resolve({
      path: fileObj.path,
      content: content
    })
  } catch (parseOrReadError) {
    reject(parseOrReadError)
  }
})
