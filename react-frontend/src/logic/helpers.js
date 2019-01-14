const log = (text) => {
  let date = new Date;
  console.log('------------------------------------');
  console.log("[" + date.toLocaleTimeString() + "] " + text);
}

export default log;