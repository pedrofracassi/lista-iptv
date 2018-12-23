const fs = require('fs')
const fileUtils = require('./utils.js')
const m3u = require('m3u')

let playlistFileText = '#EXTM3U'

fileUtils.requireDirectory('groups', group => {
  group.channels.forEach(channel => {
    channel.streamURLs.forEach(url => {
      let itemHeader = '#EXTINF:0'

      if (channel.logoURL) itemHeader += ` tvg-logo="${channel.logoURL}"`
      if (group.groupTitle) itemHeader += ` group-title="${group.groupTitle}"`

      itemHeader += `,${channel.displayName}`
      itemHeader += `\n${url}`
      playlistFileText += `\n\n${itemHeader}`
    })
  })
}).then(() => {
  fs.mkdirSync('dist')
  fs.writeFileSync('dist/lista.m3u', playlistFileText)
})