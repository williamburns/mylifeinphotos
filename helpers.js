module.exports = {
    ifNotFirst: (array, element, options) => {
        if (array.indexOf(element) === 0)
            return options.inverse(element);
        else
            return options.fn(element);
    },

    ifNotLast: (array, element, options) => {
        if (array.indexOf(element) === (array.length - 1))
            return options.inverse(element);
        else
            return options.fn(element);
    },

    cycleLeft: (array, element) => {
        return array[array.indexOf(element) - 1].split(".")[0];
    },

    cycleRight: (array, element) => {
        return array[array.indexOf(element) + 1].split(".")[0];
    },

    notFirstOrLast: (array, element, options) => {
        let ind = array.indexOf(element);
        if (!(ind === 0 || ind === (array.length - 1)))
            return options.fn(element);
        else
            return options.inverse(element);
    },

    removeExt: (element) => element.split(".")[0]
};