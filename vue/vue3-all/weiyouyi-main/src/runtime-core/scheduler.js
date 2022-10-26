// 任务的调度 queue收集任务，

const queue = []
let isFlushing = false
const resolvedPromise = Promise.resolve()
let currentPromise = null

export function nextTick(fn) {
  const p = currentPromise || resolvedPromise
  return fn ? p.then(fn) : p
}
// 任务入列
export function queueJob(job) {
  if (!queue.includes(job)) {
    queue.push(job)
    queueFlush()
  }
}

function queueFlush() {
  if (!isFlushing) {
    isFlushing = true
    currentPromise = resolvedPromise.then(flushJobs)
  }
}
// 执行所有任务
function flushJobs() {
  try {
    for (let i = 0 ;i < queue.length; i++) {
      const job = queue[i]
      job()
    }
  } finally {
    isFlushing = false
    queue.length = 0
    currentPromise = null
  }
}
