/*
 * @file Promise queueing method.
 *
 * @author Koray K. <koray@ohshift.io>
 * Created on Wed May 24 2023
 */

/**
 * Dummy promise method
 * @param {Number} ms Milliseconds to wait
 * @param {Number} no Queue number
 * @returns {Promise<Number>}
 */
function sleep(ms, no) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
      // no == 2 ? reject(no) : resolve(ms);
      // console.log(no == 2 ? "error" : "sleep done", ms, no);
    }, ms);
  });
}

/**
 *
 * @param {Array<*[]>} values
 * @param {Function} fn
 * @returns {Promise<*[]>}
 */
async function sequence(values, fn) {
  const result = [];
  await values.reduce(
    async (promise, value, index) =>
      promise
        .then(() => fn(value, index))
        .then((res) => result.push(res))
        .catch((err) => result.push(err)),
    Promise.resolve()
  );
  return result;
}

module.exports = {
  sequence,
  sleep,
};

// sequence([3000, 2000, 1000, 2100], sleep).then((r) => {
//   console.log(r);
// });
