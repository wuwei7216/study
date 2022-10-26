// 入口
import * as runtimeDom from "./runtime-dom"
import { registerRuntimeCompiler } from "./runtime-dom"

import { compiler } from "./compiler-core/"
export * from "./reactivity/"
export * from "./runtime-dom"


function compileToFunction(template, options = {}) {
  const { code } = compiler(template, options)
  const render = new Function("Vue", code)(runtimeDom)

  return render
}

registerRuntimeCompiler(compileToFunction)
