class Tree {
  tree = {}
  proxy = {}
  refs = {}
  imports = {}
  forms = {}
  pure = {}
  params = {}
  constructor() {}
}

const read_nest = (object, address) => {
  if (typeof address == "string") address = address.split(".")

  const address_step = address.shift()

  if (address_step) return read_nest(object[address_step], address)
  else return object
}
const set_nest = (object, address, value) => {
  if (typeof address == "string") address = address.split(".")

  const address_step = address.shift()
  if (address_step)
    if (address.length > 1) read_nest(object[address_step], address)
    else object[address_step] = value
}

class CoreWorker extends Tree {
  constructor() {
    super()
  }
  set_imports() {
    const items = document.querySelectorAll("script[ref_href_lib]")
    items.forEach(item => {
      this.imports[item.getAttribute("ref_href_lib") || ""] =
        window[item.getAttribute("name_href_lib") || ""]
    })
  }
  deep_proxy(container, callback) {
    const handler = {
      get: (target, prop, receiver) => {
        const value = Reflect.get(target, prop, receiver)
        if (typeof value == "object" && value !== null) {
          return this.deep_proxy(value, callback)
        }
        return value
      },
      set: (target, prop, receiver) => {
        set_nest(target, prop, receiver)
        console.log(target, prop, receiver)
        callback(container, target, prop, receiver)
        return true
      }
    }
    return new Proxy(this.proxy, handler)
  }
  proxy_callback = (container, target, prop, receiver) => {
    const items = document.querySelectorAll(`[proxy_data="${prop}"]`)
    console.log(items, prop)
    items.forEach(item => {
      item.textContent = read_nest(
        this.proxy,
        item.getAttribute("proxy_data") || ""
      )
    })
  }
  set_refs() {
    const items = document.querySelectorAll("[ref]")
    items.forEach(item => {
      this.refs[item.getAttribute("ref") || ""] = item
    })
  }
  set_forms() {
    const forms = document.querySelectorAll("div[form]")
    forms.forEach(form => {
      const form_name = form.getAttribute("form") || "_"
      this.forms[form_name] = {}
      const inputs = form.querySelectorAll("input[data-input]")
      inputs.forEach(input => {
        const name = input.getAttribute("name") || "_"
        const proxy = input.getAttribute("input-proxy")
        this.forms[form_name][name] = input
        if (proxy) {
          this.proxy[proxy] = input["value"]
          input.addEventListener("input", () => {
            if (proxy) this.proxy[proxy] = input["value"]
          })
        }
      })
    })
  }
  set_table(){
    
  }
  set_params() {
    const url_params = new URLSearchParams(window.location.search)
    const it = url_params.entries()
    for (let [key, value] of it) {
      this.params[key.toString()] = value.toString()
    }
  }
  init() {
    this.set_params()
    this.set_imports()
    this.set_refs()
    this.proxy = this.deep_proxy(this.proxy, this.proxy_callback)
    this.set_forms()
    return this
  }
  $on_event(query, event, callback) {
    const self = document.querySelector(query)
    if (!this.tree[query]) this.tree[query] = {}
    self?.addEventListener(event, () => {
      callback({
        self,
        item: this.tree[query],
        proxy: this.proxy,
        refs: this.refs,
        imports: this.imports,
        forms: this.forms,
        params: this.params
      })
    })
  }
}
