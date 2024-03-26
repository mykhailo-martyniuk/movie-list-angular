// 2.

console.log('Task 2. You have an array with length N+1. It contains numbers from 1 to N. Find the duplicated number.');

const findDuplicateNumber = (arr) => {
  const set = new Set();

  for (const el of arr) {
    if (set.has(el)) return el;
    set.add(el);
  }
  return undefined;
};

const arrWithDuplicate = [1, 2, 3, 4, 5, 6, 4, 7, 8, 9, 10];
const arrWithDuplicate2 = [1, 1, 3];
const arrWithoutDuplicate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

console.log('Input:\n', arrWithDuplicate, '\nOutput:\n', findDuplicateNumber(arrWithDuplicate));
console.log('Input:\n', arrWithDuplicate2, '\nOutput:\n', findDuplicateNumber(arrWithDuplicate2));
console.log('Input:\n', arrWithoutDuplicate, '\nOutput:\n', findDuplicateNumber(arrWithoutDuplicate));

console.log(
  'Task 3. You have an array of UUIDs. Each cell in the array is Long and holds 8 bytes. How can you reduce the space complexity?'
);

console.log("Answer: It's not possible without sacrificing some uniqueness to fit them into this space");

console.log('Task 4. Implement class Promise');

class CustomPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.error = undefined;
    this.resolveHandlers = [];
    this.rejectHandlers = [];

    const resolve = (value) => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.value = value;
      setTimeout(() => {
        this.resolveHandlers.forEach(handler => handler(value));
      }, 0);
    };

    const reject = (error) => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.error = error;
      setTimeout(() => {
        this.rejectHandlers.forEach(handler => handler(error));
      }, 0);
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      const onFulfilledWrapper = (value) => {
        try {
          const result = onFulfilled ? onFulfilled(value) : value;
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      const onRejectedWrapper = (error) => {
        try {
          const result = onRejected ? onRejected(error) : error;
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === 'fulfilled') {
        setTimeout(() => {
          onFulfilledWrapper(this.value);
        }, 0);
      } else if (this.state === 'rejected') {
        setTimeout(() => {
          onRejectedWrapper(this.error);
        }, 0);
      } else if (this.state === 'pending') {
        this.resolveHandlers.push(onFulfilledWrapper);
        this.rejectHandlers.push(onRejectedWrapper);
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
}


console.log('sync call 1');

const customPromise = new CustomPromise((res, rej) => res('custom: should be after sync code')).then((res) =>
  console.log('resolve: ', res)
);

console.log('sync call 3');

const promise = new Promise((res, rej) => res('native: should be after sync code')).then((res) =>
  console.log('resolve: ', res)
);

console.log('sync call 4');

const customPromise1 = new CustomPromise((res, rej) =>
  setTimeout(() => {
    res('custom test');
  }, 3000)
).then((res) => console.log('resolve: ', res));

console.log('sync call 5');

const customPromise2 = new CustomPromise((res, rej) =>
  setTimeout(() => {
    rej('custom test2');
  }, 3000)
).catch((res) => console.log('reject: ', res));

console.log('sync call 6');

const promise2 = new CustomPromise((res, rej) =>
  setTimeout(() => {
    res('native test1');
  }, 3000)
).then((res) => console.log('resolve: ', res));

console.log('sync call 7');

const promise3 = new Promise((res, rej) =>
  setTimeout(() => {
    rej('native test2');
  }, 3000)
).catch((res) => console.log('reject: ', res));

console.log('sync call 8');
