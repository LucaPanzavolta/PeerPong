const log = (msg1, msg2) => {
  console.log('-----------------------');
  console.log(msg1);
  if (msg2) console.log(msg2);
}

module.exports = {
  log
}