const tool = {
    filter: function (items, callback) {
        var arrs = [];
        items.map(function (v, k) {
            var pass = callback(v);
            if (pass) {
                arrs.push(v);
            }
        });
        return arrs;
    },
    // 找到属性匹配的第一个item
    findWhere: function (items, obj) {
        var target;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var pass = 1;
            for (var key in obj) {
                if (item[key] !== obj[key]) {
                    pass = 0;
                }
            }
            if (pass == 1) {
                target = item;
                break;
            }
        }
        return target;
    }
};
export default tool;