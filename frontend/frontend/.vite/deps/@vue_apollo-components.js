import {
  lib_default
} from "./chunk-BX7YH5IQ.js";
import {
  h
} from "./chunk-IJV5NOMV.js";

// node_modules/@vue/apollo-components/dist/vue-apollo-components.esm.mjs
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function isDataFilled(data3) {
  return data3 && Object.keys(data3).length > 0;
}
var CApolloQuery = {
  name: "ApolloQuery",
  provide: function provide() {
    return {
      getDollarApollo: this.getDollarApollo,
      getApolloQuery: this.getApolloQuery
    };
  },
  emits: ["loading", "result", "error"],
  props: {
    query: {
      type: [Function, Object],
      required: true
    },
    variables: {
      type: Object,
      "default": void 0
    },
    fetchPolicy: {
      type: String,
      "default": void 0
    },
    pollInterval: {
      type: Number,
      "default": void 0
    },
    notifyOnNetworkStatusChange: {
      type: Boolean,
      "default": void 0
    },
    context: {
      type: Object,
      "default": void 0
    },
    update: {
      type: Function,
      "default": function _default(data3) {
        return data3;
      }
    },
    skip: {
      type: Boolean,
      "default": false
    },
    debounce: {
      type: Number,
      "default": 0
    },
    throttle: {
      type: Number,
      "default": 0
    },
    clientId: {
      type: String,
      "default": void 0
    },
    deep: {
      type: Boolean,
      "default": void 0
    },
    tag: {
      type: String,
      "default": "div"
    },
    prefetch: {
      type: Boolean,
      "default": true
    },
    options: {
      type: Object,
      "default": function _default2() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      result: {
        data: null,
        loading: false,
        networkStatus: 7,
        error: null
      },
      times: 0
    };
  },
  watch: {
    fetchPolicy: function fetchPolicy(value) {
      this.$apollo.queries.query.setOptions({
        fetchPolicy: value
      });
    },
    pollInterval: function pollInterval(value) {
      this.$apollo.queries.query.setOptions({
        pollInterval: value
      });
    },
    notifyOnNetworkStatusChange: function notifyOnNetworkStatusChange(value) {
      this.$apollo.queries.query.setOptions({
        notifyOnNetworkStatusChange: value
      });
    },
    "$data.$apolloData.loading": function $data$apolloDataLoading(value) {
      this.$emit("loading", !!value);
    }
  },
  apollo: {
    $client: function $client() {
      return this.clientId;
    },
    query: function query() {
      return _objectSpread2(_objectSpread2({
        query: function query2() {
          if (typeof this.query === "function") {
            return this.query(lib_default);
          }
          return this.query;
        },
        variables: function variables() {
          return this.variables;
        },
        fetchPolicy: this.fetchPolicy,
        pollInterval: this.pollInterval,
        debounce: this.debounce,
        throttle: this.throttle,
        notifyOnNetworkStatusChange: this.notifyOnNetworkStatusChange,
        context: function context() {
          return this.context;
        },
        skip: function skip() {
          return this.skip;
        },
        deep: this.deep,
        prefetch: this.prefetch
      }, this.options), {}, {
        manual: true,
        result: function result(_result) {
          var _result2 = _result, errors = _result2.errors, loading2 = _result2.loading, networkStatus = _result2.networkStatus;
          var _result3 = _result, error = _result3.error;
          _result = Object.assign({}, _result);
          if (errors && errors.length) {
            error = new Error("Apollo errors occurred (".concat(errors.length, ")"));
            error.graphQLErrors = errors;
          }
          var data3 = {};
          if (loading2) {
            Object.assign(data3, this.$_previousData, _result.data);
          } else if (error) {
            Object.assign(data3, this.$apollo.queries.query.observer.getLastResult() || {}, _result.data);
          } else {
            data3 = _result.data;
            this.$_previousData = _result.data;
          }
          var dataNotEmpty = isDataFilled(data3);
          this.result = {
            data: dataNotEmpty ? this.update(data3) : void 0,
            fullData: dataNotEmpty ? data3 : void 0,
            loading: loading2,
            error,
            networkStatus
          };
          this.times = ++this.$_times;
          this.$emit("result", this.result);
        },
        error: function error(_error) {
          this.result.loading = false;
          this.result.error = _error;
          this.$emit("error", _error);
        }
      });
    }
  },
  created: function created() {
    this.$_times = 0;
  },
  methods: {
    getDollarApollo: function getDollarApollo() {
      return this.$apollo;
    },
    getApolloQuery: function getApolloQuery() {
      return this.$apollo.queries.query;
    }
  },
  render: function render() {
    var result = this.$slots["default"]({
      result: this.result,
      times: this.times,
      query: this.$apollo.queries.query,
      isLoading: this.$apolloData.loading,
      gqlError: this.result && this.result.error && this.result.error.gqlError
    });
    return this.tag ? h(this.tag, result) : result;
  }
};
var uid = 0;
var CApolloSubscribeToMore = {
  name: "ApolloSubscribeToMore",
  inject: ["getDollarApollo", "getApolloQuery"],
  props: {
    document: {
      type: [Function, Object],
      required: true
    },
    variables: {
      type: Object,
      "default": void 0
    },
    updateQuery: {
      type: Function,
      "default": void 0
    }
  },
  watch: {
    document: "refresh",
    variables: "refresh"
  },
  created: function created2() {
    this.$_key = "sub_component_".concat(uid++);
  },
  mounted: function mounted() {
    this.refresh();
  },
  beforeUnmount: function beforeUnmount() {
    this.destroy();
  },
  methods: {
    destroy: function destroy() {
      if (this.$_sub) {
        this.$_sub.destroy();
      }
    },
    refresh: function refresh() {
      this.destroy();
      var document = this.document;
      if (typeof document === "function") {
        document = document(lib_default);
      }
      this.$_sub = this.getDollarApollo().addSmartSubscription(this.$_key, {
        document,
        variables: this.variables,
        updateQuery: this.updateQuery,
        linkedQuery: this.getApolloQuery()
      });
    }
  },
  render: function render2() {
    return null;
  }
};
function throttle(delay, callback, options) {
  var _ref = options || {}, _ref$noTrailing = _ref.noTrailing, noTrailing = _ref$noTrailing === void 0 ? false : _ref$noTrailing, _ref$noLeading = _ref.noLeading, noLeading = _ref$noLeading === void 0 ? false : _ref$noLeading, _ref$debounceMode = _ref.debounceMode, debounceMode = _ref$debounceMode === void 0 ? void 0 : _ref$debounceMode;
  var timeoutID;
  var cancelled = false;
  var lastExec = 0;
  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  }
  function cancel(options2) {
    var _ref2 = options2 || {}, _ref2$upcomingOnly = _ref2.upcomingOnly, upcomingOnly = _ref2$upcomingOnly === void 0 ? false : _ref2$upcomingOnly;
    clearExistingTimeout();
    cancelled = !upcomingOnly;
  }
  function wrapper() {
    for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
      arguments_[_key] = arguments[_key];
    }
    var self = this;
    var elapsed = Date.now() - lastExec;
    if (cancelled) {
      return;
    }
    function exec() {
      lastExec = Date.now();
      callback.apply(self, arguments_);
    }
    function clear() {
      timeoutID = void 0;
    }
    if (!noLeading && debounceMode && !timeoutID) {
      exec();
    }
    clearExistingTimeout();
    if (debounceMode === void 0 && elapsed > delay) {
      if (noLeading) {
        lastExec = Date.now();
        if (!noTrailing) {
          timeoutID = setTimeout(debounceMode ? clear : exec, delay);
        }
      } else {
        exec();
      }
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === void 0 ? delay - elapsed : delay);
    }
  }
  wrapper.cancel = cancel;
  return wrapper;
}
function debounce(delay, callback, options) {
  var _ref = options || {}, _ref$atBegin = _ref.atBegin, atBegin = _ref$atBegin === void 0 ? false : _ref$atBegin;
  return throttle(delay, callback, {
    debounceMode: atBegin !== false
  });
}
var esm = Object.freeze({
  __proto__: null,
  debounce,
  throttle
});
function factory(action) {
  return function(cb, time) {
    return action(time, cb);
  };
}
var throttle$1 = factory(esm.throttle);
var debounce$1 = factory(esm.debounce);
var addGqlError = function addGqlError2(error) {
  if (error.graphQLErrors && error.graphQLErrors.length) {
    error.gqlError = error.graphQLErrors[0];
  }
};
var CApolloMutation = {
  props: {
    mutation: {
      type: [Function, Object],
      required: true
    },
    variables: {
      type: Object,
      "default": void 0
    },
    optimisticResponse: {
      type: Object,
      "default": void 0
    },
    update: {
      type: Function,
      "default": void 0
    },
    refetchQueries: {
      type: Function,
      "default": void 0
    },
    clientId: {
      type: String,
      "default": void 0
    },
    tag: {
      type: String,
      "default": "div"
    },
    context: {
      type: Object,
      "default": void 0
    }
  },
  data: function data2() {
    return {
      loading: false,
      error: null
    };
  },
  emits: ["loading", "done", "error"],
  watch: {
    loading: function loading(value) {
      this.$emit("loading", value);
    }
  },
  methods: {
    mutate: function mutate(options) {
      var _this = this;
      this.loading = true;
      this.error = null;
      var mutation = this.mutation;
      if (typeof mutation === "function") {
        mutation = mutation(lib_default);
      }
      return this.$apollo.mutate(_objectSpread2({
        mutation,
        client: this.clientId,
        variables: this.variables,
        optimisticResponse: this.optimisticResponse,
        update: this.update,
        refetchQueries: this.refetchQueries,
        context: this.context
      }, options)).then(function(result) {
        _this.$emit("done", result);
        _this.loading = false;
        return result;
      })["catch"](function(e) {
        addGqlError(e);
        _this.error = e;
        _this.$emit("error", e);
        _this.loading = false;
      });
    }
  },
  render: function render3() {
    var result = this.$slots["default"]({
      mutate: this.mutate,
      loading: this.loading,
      error: this.error,
      gqlError: this.error && this.error.gqlError
    });
    return this.tag ? h(this.tag, result) : result;
  }
};
var plugin = {};
function install(app, options) {
  app.component("ApolloQuery", CApolloQuery);
  app.component("ApolloSubscribeToMore", CApolloSubscribeToMore);
  app.component("ApolloMutation", CApolloMutation);
}
plugin.install = install;
plugin.version = "4.0.0";
var ApolloProvider = plugin;
var ApolloQuery = CApolloQuery;
var ApolloSubscribeToMore = CApolloSubscribeToMore;
var ApolloMutation = CApolloMutation;
var GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}
var vue_apollo_components_esm_default = plugin;
export {
  ApolloMutation,
  ApolloProvider,
  ApolloQuery,
  ApolloSubscribeToMore,
  vue_apollo_components_esm_default as default,
  install
};
//# sourceMappingURL=@vue_apollo-components.js.map
