var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var Tree = /** @class */ (function () {
    function Tree() {
        this.tree = {};
        this.data = {
            proxy: {},
            refs: {},
            params: {}
        };
        this.ext = {
            form: {},
            table: {},
            imports: {}
        };
    }
    return Tree;
}());
var read_nest = function (object, address) {
    if (typeof address == 'string')
        address = address.split('.');
    var address_step = address.shift();
    if (address_step)
        return read_nest(object[address_step], address);
    else
        return object;
};
var set_nest = function (object, address, value) {
    if (typeof address == 'string')
        address = address.split('.');
    var address_step = address.shift();
    if (address_step)
        if (address.length > 1)
            read_nest(object[address_step], address);
        else
            object[address_step] = value;
};
var deep_proxy = function (container, callback) {
    var handler = {
        get: function (target, prop, receiver) {
            var value = Reflect.get(target, prop, receiver);
            if (typeof value == 'object' && value !== null) {
                return deep_proxy(value, callback);
            }
            return value;
        },
        set: function (target, prop, receiver) {
            set_nest(target, prop, receiver);
            callback(container, target, prop, receiver);
            return true;
        }
    };
    return new Proxy(container, handler);
};
var proxy_callback = function (container, target, prop, receiver) {
    var items = document.querySelectorAll("[proxy_data=\"".concat(prop, "\"]"));
    items.forEach(function (item) {
        item.textContent = read_nest(container, item.getAttribute('proxy_data') || '');
    });
};
var CarbeeForm = /** @class */ (function () {
    function CarbeeForm(form) {
        this.fields = {};
        this.proxy = deep_proxy({}, proxy_callback);
        this.form = form;
        this.init();
    }
    CarbeeForm.prototype.init = function () {
        var _this = this;
        var inputs = this.form.querySelectorAll('input[data-input]');
        inputs.forEach(function (input) {
            var name = input.getAttribute('name') || '_';
            var proxy = input.getAttribute('input-proxy');
            _this.fields[name] = input;
            if (proxy) {
                _this.proxy[proxy] = input['value'];
                input.addEventListener('input', function () {
                    if (proxy)
                        _this.proxy[proxy] = input['value'];
                });
            }
        });
    };
    CarbeeForm.prototype.to_object = function () {
        var data = {};
        Object.entries(this.fields).forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            data[key] = value['value'];
        });
        return data;
    };
    CarbeeForm.prototype.fetch = function (url, headers, data, options) {
        if (headers === void 0) { headers = {}; }
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url, __assign({ method: 'POST', mode: 'cors', headers: __assign({ "Content-Type": "application/json" }, headers), body: JSON.stringify(__assign(__assign({}, this.to_object()), data)) }, options))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CarbeeForm.prototype.reset = function () {
        Object.values(this.fields).forEach(function (item) {
            item['value'] = '';
        });
    };
    return CarbeeForm;
}());
var CarbeeTable = /** @class */ (function () {
    function CarbeeTable(table) {
        this.carbee_table = table;
        this.table = table.querySelector('table');
        this.init();
    }
    CarbeeTable.prototype.init = function () {
    };
    CarbeeTable.prototype.find = function (row, column) {
        var rows = this.table.getElementsByTagName('tr');
        if (row >= 0 && row < rows.length) {
            var cells = rows[row].getElementsByTagName('td');
            if (column >= 0 && column < cells.length) {
                return cells[column];
            }
        }
        return null;
    };
    CarbeeTable.prototype.get = function (row, column) {
        var cell = this.find(row, column);
        return cell ? cell.textContent : null;
    };
    CarbeeTable.prototype.set = function (row, column, value) {
        var cell = this.find(row, column);
        if (cell)
            cell.textContent = value.toString();
    };
    CarbeeTable.prototype.add_column = function (for_rows) {
        var rows = this.table.getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {
            if (for_rows && !for_rows.includes(i))
                continue;
            var cell = document.createElement('td');
            rows[i].appendChild(cell);
        }
    };
    CarbeeTable.prototype.add_row = function () {
        var row = document.createElement('tr');
        var cell_count = 0;
        Array.from(this.table.getElementsByTagName('tr')).forEach(function (item) {
            var cells = item.getElementsByTagName('td');
            cell_count = cells.length > cell_count ? cells.length : cell_count;
        });
        for (var i = 0; i < cell_count; i++) {
            var cell = document.createElement('td');
            row.appendChild(cell);
        }
        this.table.appendChild(row);
    };
    CarbeeTable.prototype.get_headers = function () {
        var headerRow = this.table.querySelector('tr');
        var headers = headerRow ? Array.from(headerRow.querySelectorAll('th, td')).map(function (cell) { return cell.textContent; }) : [];
        return headers;
    };
    CarbeeTable.prototype.to_object = function () {
        var data = [];
        var keys = [];
        this.table.querySelectorAll('tr').forEach(function (row, row_index) {
            data[row_index] = {};
            row.querySelectorAll('th, td').forEach(function (column, column_index) {
                if (row_index == 0)
                    keys.push(column.textContent);
                var column_name = keys[column_index] == undefined ? "column_".concat(column_index) : keys[column_index];
                data[row_index][column_name] = column.textContent;
            });
        });
        return data;
    };
    CarbeeTable.prototype.from_object = function (data) {
        this.clear_table();
        if (data.length == 0)
            return;
        var headers = Object.keys(data[0]);
        var row_count = data.length;
        var header_row = document.createElement('tr');
        for (var i = 0; i < headers.length; i++) {
            var header_cell = document.createElement('th');
            header_cell.textContent = headers[i];
            header_row.appendChild(header_cell);
        }
        this.table.appendChild(header_row);
        for (var i = 0; i < row_count; i++) {
            var row_data = data[i];
            var data_row = document.createElement('tr');
            for (var j = 0; j < headers.length; j++) {
                var dataCell = document.createElement('td');
                dataCell.textContent = row_data[headers[j]];
                data_row.appendChild(dataCell);
            }
            this.table.appendChild(data_row);
        }
    };
    CarbeeTable.prototype.clear_table = function () {
        while (this.table.firstChild) {
            this.table.removeChild(this.table.firstChild);
        }
    };
    return CarbeeTable;
}());
var CoreWorker = /** @class */ (function (_super) {
    __extends(CoreWorker, _super);
    function CoreWorker() {
        return _super.call(this) || this;
    }
    CoreWorker.prototype.set_imports = function () {
        var _this = this;
        var items = document.querySelectorAll('script[ref_href_lib]');
        items.forEach(function (item) {
            _this.ext.imports[item.getAttribute('ref_href_lib') || ''] = window[item.getAttribute('name_href_lib') || ''];
        });
    };
    CoreWorker.prototype.set_refs = function () {
        var _this = this;
        var items = document.querySelectorAll('[ref]');
        items.forEach(function (item) {
            _this.data.refs[item.getAttribute('ref') || ''] = item;
        });
    };
    CoreWorker.prototype.set_forms = function () {
        var _this = this;
        var forms = document.querySelectorAll('div[form]');
        forms.forEach(function (divform) {
            var form_name = divform.getAttribute('form') || '_';
            var form = new CarbeeForm(divform);
            _this.ext.form[form_name] = form;
        });
    };
    CoreWorker.prototype.set_table = function () {
        var _this = this;
        var tables = document.querySelectorAll('div[table]');
        tables.forEach(function (divtable) {
            var table_name = divtable.getAttribute('table') || '_';
            var table = new CarbeeTable(divtable);
            _this.ext.table[table_name] = table;
        });
    };
    CoreWorker.prototype.set_params = function () {
        var e_1, _a;
        var url_params = new URLSearchParams(window.location.search);
        var it = url_params.entries();
        try {
            for (var it_1 = __values(it), it_1_1 = it_1.next(); !it_1_1.done; it_1_1 = it_1.next()) {
                var _b = __read(it_1_1.value, 2), key = _b[0], value = _b[1];
                this.data.params[key.toString()] = value.toString();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (it_1_1 && !it_1_1.done && (_a = it_1["return"])) _a.call(it_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    CoreWorker.prototype.init = function () {
        this.set_params();
        this.set_imports();
        this.set_refs();
        this.data.proxy = deep_proxy(this.data.proxy, proxy_callback);
        this.set_forms();
        this.set_table();
        return this;
    };
    CoreWorker.prototype.$on_event = function (query, event, callback) {
        var _this = this;
        var self = document.querySelector(query);
        if (!this.tree[query])
            this.tree[query] = {};
        self === null || self === void 0 ? void 0 : self.addEventListener(event, function () {
            callback({
                self: self,
                item: _this.tree[query],
                data: _this.data,
                ext: _this.ext
            });
        });
    };
    return CoreWorker;
}(Tree));
